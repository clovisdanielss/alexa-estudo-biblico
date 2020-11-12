const { getSlotValue, getSlot } = require("ask-sdk-core");
const { getIntro } = require("../EstudosHandler/introducoes");
const intentNames = require("../Parametros/intentNames");
const estadoNames = require("../Parametros/estadoNames");
const { getCannonicalSlotValue } = require("../util");
const estudosNames = require("../Parametros/estudosNames");
const { checarSeResposta } = require("../EstudosHandler/checarSeResposta");
const { ABibliaSagrada } = require("../Parametros/estudosNames");
const { criarEstado } = require("./estado");
const { checarSePergunta } = require("../EstudosHandler/checarSePergunta");

/**
 * Todo estudo bíblico passa a priore pela intenção de introdução.
 * Ela serve de gatilho, e leva para intenção de perguntas.
 * A intenção de pergunta deve intercalar com a intenção de respostas até que não
 * exista mais nenhuma pergunta naquele estudo.
 * */

module.exports = class PerguntaBuilder {
  constructor(pergunta) {
    this.pergunta = pergunta;
    return this;
  }

  setEstudoAtual(estudoAtual) {
    this.estudoAtual = estudoAtual;
    return this;
  }

  /***
   * Tanto a perguntaBehavior como resposta, podem receber o estado
   * assim como o inputHandler como parâmetro.
   */
  setPerguntaBehavior(callback) {
    this.perguntaBehavior = callback;
    return this;
  }

  setRespostaBehavior(callback) {
    this.respostaBehavior = callback;
    return this;
  }

  build() {
    if(!this.respostaBehavior){
        throw new Error("The respostaBehavior has not been set");
    }
    if(!this.perguntaBehavior){
        throw new Error("The perguntaBehavior has not been set");
    }
    if(!this.pergunta){
        throw new Error("The pergunta (question number) has not been set");
    }
    if(!this.estudoAtual){
        throw new Error("The estudoAtual has not been set");
    }
    const ref = this;

    function perguntaBehavior(handlerInput) {
      let estado = criarEstado(null, ref.estudoAtual, ref.pergunta);
      estado[estadoNames.IsResposta] = true;
      if (checarSePergunta(handlerInput, ref.estudoAtual, ref.pergunta)) {
        handlerInput.attributesManager.setSessionAttributes(estado);
        return ref.perguntaBehavior(handlerInput, estado);
      }
      return false;
    }

    function respostaBehavior(handlerInput) {
      let estado = criarEstado(null, ref.estudoAtual, ref.pergunta);
      if (checarSeResposta(handlerInput, ref.estudoAtual, ref.pergunta)) {
        handlerInput.attributesManager.setSessionAttributes(estado);
        return ref.respostaBehavior(handlerInput, estado);
      }
      return false;
    }

    return {
      canHandle(handlerInput) {
        return (
          checarSeResposta(handlerInput, ref.estudoAtual, ref.pergunta) ||
          checarSePergunta(handlerInput, ref.estudoAtual, ref.pergunta)
        );
      },
      handle(handlerInput) {
        //let slot = getSlot(handlerInput.requestEnvelope, "estudo");
        //let slotCanonicalValue = getCannonicalSlotValue(slot);
        let speakOutput = perguntaBehavior(handlerInput);
        if (!speakOutput) speakOutput = respostaBehavior(handlerInput);

        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
      },
    };
  }
};

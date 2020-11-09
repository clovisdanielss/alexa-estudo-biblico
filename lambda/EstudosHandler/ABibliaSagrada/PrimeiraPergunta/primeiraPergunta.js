const { getSlotValue, getSlot } = require("ask-sdk-core");
const { getIntro } = require("../../introducoes");
const intentNames = require("../../../Parametros/intentNames");
const estadoNames = require("../../../Parametros/estadoNames");
const { getCannonicalSlotValue } = require("../../../util");
const estudosNames = require("../../../Parametros/estudosNames");
const message = require("./message");
const { checarSeResposta } = require("../../checarSeResposta");
const { ABibliaSagrada } = require("../../../Parametros/estudosNames");
const { criarEstado } = require("../../../Modelos/estado");

/**
 * Todo estudo bíblico passa a priore pela intenção de introdução.
 * Ela serve de gatilho, e leva para intenção de perguntas.
 * A intenção de pergunta deve intercalar com a intenção de respostas até que não
 * exista mais nenhuma pergunta naquele estudo.
 * */

module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        checarSeResposta(handlerInput, 1, estudosNames.ABibliaSagrada) ||
        (handlerInput.attributesManager.getSessionAttributes()[
          estadoNames.PresentStudy
        ] === estudosNames.ABibliaSagrada &&
          handlerInput.attributesManager.getSessionAttributes()[
            estadoNames.PrevIntent
          ] === intentNames.Introducao &&
          Alexa.getRequestType(handlerInput.requestEnvelope) ===
            "IntentRequest" &&
          Alexa.getIntentName(handlerInput.requestEnvelope) ===
            intentNames.Confirmacao)
      );
    },
    handle(handlerInput) {
      //let slot = getSlot(handlerInput.requestEnvelope, "estudo");
      //let slotCanonicalValue = getCannonicalSlotValue(slot);
      const speakOutput = questionBehavior(handlerInput);

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  };
};

function questionBehavior(handlerInput) {
  let estado = criarEstado(null,estudosNames.ABibliaSagrada,1)
  if (checarSeResposta(handlerInput, 1, estudosNames.ABibliaSagrada)) {
    handlerInput.attributesManager.setSessionAttributes(estado);
    return "Isso foi uma resposta";
  } else {
    estado[estadoNames.IsResponse] = true;
    handlerInput.attributesManager.setSessionAttributes(estado);
    return message;
  }
}

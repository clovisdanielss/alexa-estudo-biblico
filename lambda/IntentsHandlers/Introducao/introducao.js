const { getSlotValue, getSlot } = require("ask-sdk-core");
const { getIntro } = require("../../EstudosHandler/introducoes");
const intentNames = require("../../Parametros/intentNames");
const estadoNames = require("../../Parametros/estadoNames");
const { getCannonicalSlotValue } = require("../../util");
const { criarEstado } = require("../../Modelos/estado");

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
        handlerInput.attributesManager.getSessionAttributes()[
          estadoNames.PrevIntent
        ] === intentNames.InicioEstudo &&
        Alexa.getRequestType(handlerInput.requestEnvelope) ===
          "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          intentNames.Introducao
      );
    },
    handle(handlerInput) {
      let slot = getSlot(handlerInput.requestEnvelope, "estudo");
      let slotCanonicalValue = getCannonicalSlotValue(slot);

      let estado = criarEstado(intentNames.Introducao, slotCanonicalValue);

      handlerInput.attributesManager.setSessionAttributes(estado);

      const speakOutput = getIntro(slotCanonicalValue);

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  };
};

const { getSlotValue, getSlot } = require("ask-sdk-core");
const { getIntro } = require("../../Estudos/introducoes");
const intentNames = require("../../intentNames");
const paramNames = require("../../paramNames");
const { getCannonicalSlotValue } = require("../../util");

/**
 * Todo estudo bíblico passa a priore pela intenção de introdução.
 * Ela serve de gatilho, e leva para intenção de perguntas.
 * A intenção de pergunta deve intercalar com a intenção de respostas até que não
 * exista mais nenhuma pergunta naquele estudo. 
 * */

Intents = require("../../intentNames");

module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        handlerInput.attributesManager.getSessionAttributes()[
          paramNames.PrevIntent
        ] === intentNames.InicioEstudo &&
        Alexa.getRequestType(handlerInput.requestEnvelope) ===
          "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          intentNames.Introducao
      );
    },
    handle(handlerInput) {
      let slot = getSlot(handlerInput.requestEnvelope, "estudo");
      const speakOutput = getIntro(getCannonicalSlotValue(slot));
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  };
};

const intentNames = require('../intentNames');
const paramNames = require('../paramNames');
const message = require('./message');

Intents = require('../intentNames');

module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
      );
    },
    handle(handlerInput) {
      const speakOutput = message;

      handlerInput.attributesManager.setSessionAttributes({
        [paramNames.PrevIntent]: intentNames.InicioEstudo,
      });

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  };
};

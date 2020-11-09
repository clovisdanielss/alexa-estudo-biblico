const intentNames = require('../Parametros/intentNames');
const estadoNames = require('../Parametros/estadoNames');
const message = require('./message');
const { criarEstado } = require('../Modelos/estado');

module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
      );
    },
    handle(handlerInput) {
      const speakOutput = message;

      let estado = criarEstado(intentNames.InicioEstudo)
      
      handlerInput.attributesManager.setSessionAttributes(estado);

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  };
};

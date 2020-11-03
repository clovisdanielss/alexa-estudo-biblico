module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) ===
          "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "InicioEstudoIntent"
      );
    },
    handle(handlerInput) {
      const speakOutput = "Olá, então a dinâmica vai ser da seguinte forma. Eu vou lançar perguntas "
      +"e também vou dar alguns versos para você ler. Depois de ler, você pode responder minhas perguntas."
      +" Preparado ?";

      return (
        handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse()
      );
    },
  };
};

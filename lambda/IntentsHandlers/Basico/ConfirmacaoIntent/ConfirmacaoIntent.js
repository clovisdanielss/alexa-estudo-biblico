module.exports = (Alexa) => {
  return {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) ===
          "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "Basico.ConfirmacaoIntent"
      );
    },
    handle(handlerInput) {
      const speakOutput = "Você disse SIM.";

      return (
        handlerInput.responseBuilder
          .speak(speakOutput)
          //.reprompt(speakOutput)
          .getResponse()
      );
    },
  };
};

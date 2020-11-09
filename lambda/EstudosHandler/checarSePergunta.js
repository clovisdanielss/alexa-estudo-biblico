const { getRequestType, getIntentName } = require("ask-sdk-core");
const estadoNames = require("../Parametros/estadoNames");
const intentNames = require("../Parametros/intentNames");

module.exports.checarSePergunta = function checarSePergunta(handlerInput,  presentStudy,  question) {
  try{
  return (
    handlerInput.attributesManager.getSessionAttributes()[
      estadoNames.PresentStudy
    ] === presentStudy &&
    handlerInput.attributesManager.getSessionAttributes()[
      estadoNames.Question
    ] === question - 1 &&
    getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
    getIntentName(handlerInput.requestEnvelope) === intentNames.Confirmacao
  )
} catch(e){
  console.log(e);
  throw e;
};
};

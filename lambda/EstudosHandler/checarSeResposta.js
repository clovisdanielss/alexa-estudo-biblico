const estadoNames = require("../Parametros/estadoNames")

/***
 * Método para checar se a mensagem do usuário é uma resposta.
 * Esse método baseia-se no estado atual.
 * Ele verifica o estudo presente, o número da pergunta e se trata-se de uma resposta (Isto é, se a pergunta já foi feita).
 */
module.exports.checarSeResposta = function checarSeResposta(handlerInput,presentStudy,question){
    return  handlerInput.attributesManager.getSessionAttributes()[
        estadoNames.PresentStudy
      ] === presentStudy &&
      handlerInput.attributesManager.getSessionAttributes()[
        estadoNames.Question
      ] === question &&
      handlerInput.attributesManager.getSessionAttributes()[
        estadoNames.IsResponse
      ] === true;
}
const estadoNames = require("../Parametros/estadoNames")

module.exports.criarEstado = function criarEstado(prevIntent, presentStudy, question, isResponse){
    return {
        [estadoNames.IntencaoAnterior]: prevIntent,
        [estadoNames.EstudoAtual]: presentStudy,
        [estadoNames.Pergunta]: question,
        [estadoNames.IsResposta]: isResponse,
    }
}
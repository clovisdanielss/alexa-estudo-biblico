const estadoNames = require("../Parametros/estadoNames")

module.exports.criarEstado = function criarEstado(prevIntent, presentStudy, question, isResponse){
    return {
        [estadoNames.PrevIntent]: prevIntent,
        [estadoNames.PresentStudy]: presentStudy,
        [estadoNames.Question]: question,
        [estadoNames.IsResponse]: isResponse,
    }
}
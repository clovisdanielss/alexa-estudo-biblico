const estudosNames = require("../../../Parametros/estudosNames");
const message = require("./message");
const PerguntaBuilder = require("../../../Modelos/pergunta");


module.exports = (Alexa) =>
  new PerguntaBuilder(1)
    .setEstudoAtual(estudosNames.ABibliaSagrada)
    .setPerguntaBehavior(() => {
      return message;
    })
    .setRespostaBehavior(() => {
      return "Isso foi uma resposta. Deseja ir para próxima pergunta ?";
    })
    .build();

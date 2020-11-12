const PerguntaBuilder = require("../../../Modelos/pergunta");
const estudosNames = require("../../../Parametros/estudosNames");

module.exports = () => new PerguntaBuilder(2)
  .setEstudoAtual(estudosNames.ABibliaSagrada)
  .setPerguntaBehavior(() => "Essa é a pergunta 2")
  .setRespostaBehavior(() => "essa foi a segunda resposta")
  .build();

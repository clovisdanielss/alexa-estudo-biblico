module.exports = function getIntentsHandlersArray(Alexa){
    if(!Alexa){
        throw Error('Alexa must not be null nor undefined');
    }
    return[
        require('./LaunchRequestHandler/inicioEstudo')(Alexa),
        require('./IntentsHandlers/Introducao/introducao')(Alexa),
        require('./EstudosHandler/ABibliaSagrada/PrimeiraPergunta/primeiraPergunta')(Alexa)
    ]
}
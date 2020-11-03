module.exports = function getIntentsHandlersArray(Alexa){
    if(!Alexa){
        throw Error('Alexa must not be null nor undefined');
    }
    return[
        require('./InicioEstudo/InicioEstudo')(Alexa),
    ]
}
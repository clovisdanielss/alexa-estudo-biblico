/***
 * Um estudo bíblico deve possuir uma introdução.
 * Aqui é o registro do diálogo de introduções.
 */

const estudosIntro = [
    {"A Bíblia Sagrada":require("./ABibliaSagrada/introducao")}
]

module.exports.getIntro = (slotCanonicalValue) =>{
    return estudosIntro[slotCanonicalValue];
}
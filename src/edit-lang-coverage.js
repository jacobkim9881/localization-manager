const langsExplain = require('./lang_code')

const languageToTranslate = [
// Add desired languages to this array using the langsExplain object.
/* Put desired languages from langsExplain here, for example
 *
 * langsExplain.af 
 *
 * Leave this array empty to translate all languages.
 */
]

exportLanguages(languageToTranslate)

// Determines exporting of the langsToTranslate array, or the langsExplain object.
function exportLanguages(langsToTranslate) {
  if(langsToTranslate.length == 0) {
    module.exports = langsExplain;
  } else {
    module.exports = langsToTranslate;
  }
}

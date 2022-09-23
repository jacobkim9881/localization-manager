const languageToTranslate = [
// Add desired languages to this array using the langsExplain object.
/* Put desired languages from langsExplain here, for example
 * 
 * uncomment below,
 // af, yi, xh
 *
 * Leave this array empty to translate all languages.
 */

]

const langsExplain = require('./lang_code')

exportLanguages(langsToTranslate)

// Determines exporting of the langsToTranslate array, or the langsExplain object.
function exportLanguages(langsToTranslate) {
  if(langsToTranslate.length == 0) {
    module.exports = langsExplain;
  } else {
    module.exports = langsToTranslate;
  }
}

const NBSP = "\u00A0"
const NNBSP = "\u202F"

/**
 * Applique les règles typographiques françaises à une chaîne de texte.
 * Doit être appelée sur du texte brut, avant tout parsing Markdown ou HTML.
 *
 * @param {string} text - Le texte à transformer
 * @returns {string} Le texte avec la typographie française correcte
 */
export function applyFrenchTypography(text) {
    return text
        // « texte  →  «\u202Ftexte (espace fine insécable après le guillemet ouvrant)
        .replace(/«\s*/g, `«${NNBSP}`)
        // texte »  →  texte\u202F» (espace fine insécable avant le guillemet fermant)
        .replace(/\s*»/g, `${NNBSP}»`)
        // texte !  →  texte\u202F!  (idem pour "?")
        .replace(/\s*([!?])/g, `${NNBSP}$1`)
        // Espace fine insécable avant ";" sauf si précédé d'une entité HTML (ex: &#43;, &amp;)
        .replace(/(?<!&[a-zA-Z0-9#]{1,10})\s*;/g, `${NNBSP};`)
        // texte :  →  texte\u00A0: (espace insécable classique avant ":")
        .replace(/\s*:/g, `${NBSP}:`)
}
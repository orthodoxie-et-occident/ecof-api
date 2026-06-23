import { synaxarVita } from "./repository"
import { parseMarkdown } from "../../utils/markdown.js"

export async function getSaintLives(id) {
    const vita = await synaxarVita.getVita(id)
    if (!vita) return null

    return {
        ...vita,
        vie_b: parseMarkdown(vita.vie_b),
        vita_long: parseMarkdown(vita.vita_long),
        vita_liturgy: parseMarkdown(vita.vita_liturgy),
    }
}

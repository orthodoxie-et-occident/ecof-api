import { synaxarSaints } from "./repository"

export async function getSaints() {
    const saints = await synaxarSaints.getSaints()
    return saints
}

export async function getSaintsByDate(date) {
    const [, mois, jour] = date.match(/^\d{4}-(\d{2})-(\d{2})$/) || []

    if (!mois || !jour) {
        throw new Error("Format de date invalide, attendu YYYY-MM-DD")
    }

    const saints = await synaxarSaints.getSaintsByDate(Number(mois), Number(jour))
    return saints
}

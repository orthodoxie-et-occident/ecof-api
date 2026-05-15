import { synaxarSaints } from "../repositories/synaxar"

export async function getSaints() {
    const saints = await synaxarSaints.getSaints()
    return saints
}

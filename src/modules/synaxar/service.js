import { synaxarSaints } from "./repository"

export async function getSaints() {
    const saints = await synaxarSaints.getSaints()
    return saints
}

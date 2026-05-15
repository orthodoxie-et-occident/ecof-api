import { synaxarVita } from "../repositories/vita.js"

export async function getSaintLives(id) {
    const vita = await synaxarVita.getVita(id)
    return vita
}

import { synaxarVita } from "../repositories/vita.js"

/**
 * Get short and long life for a given saint
 * @param {strings} id
 * @returns {Promise<Object>}
 */
export async function getSaintLives(id) {
    const vita = await synaxarVita.getVita(id)
    return vita
}

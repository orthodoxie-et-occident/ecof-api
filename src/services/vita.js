import { synaxar } from "../repositories/vita.js"

/**
 * Get short and long life for a given saint
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getSaintLives(id) {
    const vita = await synaxar.getVita(id)
    return vita
}

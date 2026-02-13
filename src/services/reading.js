import { readings } from "../repositories/reading.js"

/**
 * Get a given reading
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getReading(id) {
    const reading = await readings.getScriptureReading(id)
    return reading
}

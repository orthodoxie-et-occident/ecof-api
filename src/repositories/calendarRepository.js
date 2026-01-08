import { pool } from '../utils/databaseUtil.js'

export const calendarRepository = {
  async getSynaxar (month, day) {
    const [rows] = await pool.execute(
            `SELECT synaxaire.principal, synaxaire.prefixe, synaxaire.saint, 
              vies.id, vies.vie_l, vies.vie_b, vies.img
       FROM synaxaire
       JOIN vies ON synaxaire.vies_id = vies.id
       WHERE mois = ? AND jour = ? AND principal IN (0, 1) AND calendrier != 0`,
            [month, day]
    )
    return rows
  },

  async getTemporalReadings (temporalIndex) {
    const [rows] = await pool.execute(
            `SELECT temporal.block, temporal.book_txt, temporal.reading, 
              temporal_blocks.block_title
       FROM temporal 
       JOIN temporal_blocks ON temporal.block = block_id
       WHERE temporalIndex = ?
       ORDER BY temporal.id ASC`,
            [temporalIndex]
    )
    return rows
  },

  async getSanctoralReadings (sanctoralIndex) {
    const [rows] = await pool.execute(
            `SELECT sanctoral.block, sanctoral.book_txt, sanctoral.reading, 
              sanctoral_blocks.block_title
       FROM sanctoral 
       JOIN sanctoral_blocks ON sanctoral.block = block_id
       WHERE sanctoralIndex = ?
       ORDER BY sanctoral.id ASC`,
            [sanctoralIndex]
    )
    return rows
  }
}

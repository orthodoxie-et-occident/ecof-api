import { db } from "../utils/database"

export const vitaMonitoring = {
    async getSaintsWithBioStatus() {
        return await db`
            SELECT 
                s.saint, s.vies_id,
                v.vie_b IS NOT NULL AND v.vie_b != '' as has_vie_b,
                v.vita_long IS NOT NULL AND v.vita_long != '' as has_vita_long,
                v.vita_liturgy IS NOT NULL AND v.vita_liturgy != '' as has_vita_liturgy
            FROM synaxaire s
            LEFT JOIN vies v ON s.vies_id = v.id
            WHERE s.calendrier = 1
            ORDER BY s.saint ASC
        `
    },
}

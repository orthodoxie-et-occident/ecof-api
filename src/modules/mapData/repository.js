import { db } from "../../utils/pg_database"

export async function findAllPoi() {
    const rows = await db`SELECT name, adress, adress2, postcode, city, latitude, longitude, website, diocese FROM parishes`
    return rows
}

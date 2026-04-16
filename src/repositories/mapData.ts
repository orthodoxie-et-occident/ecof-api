import { db } from "../utils/database"

export interface Parish {
    name: string
    latitude: number
    longitude: number
}

export async function findAllPoi(): Promise<Parish[]> {
    const rows = await db`SELECT name, latitude, longitude FROM parishes`
    return rows as Parish[]
}

import { db } from "../utils/database"

export interface Parish {
    name: string
    adress: string
    adress2: string
    postcode: number
    city: string
    latitude: number
    longitude: number
    website: string
    diocese: string
}

export async function findAllPoi(): Promise<Parish[]> {
    const rows = await db`SELECT name, adress, adress2, postcode, city, latitude, longitude, website, diocese FROM parishes`
    return rows as Parish[]
}

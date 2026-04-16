import { findAllPoi, type Parish } from "../repositories/mapData"

export async function getMapData(): Promise<Parish[]> {
    return findAllPoi()
}

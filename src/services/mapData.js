import { findAllPoi } from "../repositories/mapData"

export async function getMapData() {
    return findAllPoi()
}

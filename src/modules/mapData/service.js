import { findAllPoi } from "./repository"

export async function getMapData() {
    return findAllPoi()
}

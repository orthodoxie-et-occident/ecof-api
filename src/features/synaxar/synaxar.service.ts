import {
  getVita as getVitaFromDb,
  getSaintsByDate as getSaintsByDateFromDb,
} from "./synaxar.repository"
import { mdToHtml } from "../../shared/utils/markdown"

export async function getVita(id: string) {
  const vita = await getVitaFromDb(id)
  const row = vita?.[0]
  if (!row) return null
  return {
    ...row,
    v_short: mdToHtml(row.v_short ?? ""),
    v_long: mdToHtml(row.v_long ?? ""),
    v_liturgy: mdToHtml(row.v_liturgy ?? ""),
  }
}

export async function getSaintsByDate(date: string) {
  const [, month, day] = date.split("-").map(Number) as [number, number, number]
  const sanctoralIndex = 10000 + month * 100 + day
  const saints = await getSaintsByDateFromDb(sanctoralIndex)
  return saints
}

import {
  getSanctoral,
  getTemporal,
  getReadings,
} from "./liturgical-calendar.repository"
import {
  getTemporalIndex,
  getSanctoralIndex,
  getSpecificIndex,
} from "./liturgical-calendar.utils"

export async function getCalendarData(date: string) {
  const [, month, day] = date.split("-").map(Number) as [number, number, number]
  const temporalIndex = getTemporalIndex(date)
  const sanctoralIndex = getSanctoralIndex(month, day)
  const specificIndex = getSpecificIndex(date)
  const sanctoralOfDay = await getSanctoral(sanctoralIndex)
  const temporalOfDay = await getTemporal(temporalIndex)
  const specificOfDay = await getTemporal(specificIndex)
  const readingsOfDay = await getReadings(
    temporalIndex,
    sanctoralIndex,
    specificIndex,
  )
  return {
    sanctoral: sanctoralOfDay,
    temporal: temporalOfDay,
    specific: specificOfDay,
    readings: groupReadingsByBlock(readingsOfDay),
  }
}

type Reading = {
  id: number
  book_txt: string
  block_id: number
  block_title: string
}

function groupReadingsByBlock(readings: Reading[]) {
  const grouped = new Map<
    number,
    {
      block_title: string
      readings: Omit<Reading, "block_id" | "block_title">[]
    }
  >()

  for (const { block_id, block_title, ...reading } of readings) {
    const group = grouped.get(block_id) ?? { block_title, readings: [] }
    group.readings.push(reading)
    grouped.set(block_id, group)
  }

  return Array.from(grouped.values())
}

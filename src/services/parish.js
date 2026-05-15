import ICAL from "ical.js"

const calendars = {
    angers: "https://calendar.google.com/calendar/ical/a0b13b9efa661c4e7043a1e1393ab17998b1c203459e612f07b454163b8c1471%40group.calendar.google.com/public/basic.ics",
    bordeaux: "https://calendar.google.com/calendar/ical/daba7ddef4ffb00d8fb28e21aab4cd5a63b1f895bac030fef1c375f99873dd60@group.calendar.google.com/public/basic.ics",
    amboise: "https://calendar.google.com/calendar/ical/02c5d4a8aa1e221ea68a73bb6c6843b6c1406b6305ffe2709342f939f8af9c3d@group.calendar.google.com/public/basic.ics",
    nantes: "https://calendar.google.com/calendar/ical/73bad447c0fade6c9e4fd38e50fd3d661de808ca5833249c3c4eda05fedc8550@group.calendar.google.com/public/basic.ics",
    orleans: "https://calendar.google.com/calendar/ical/a619baa6e99f4d08abee8429129ed7c3f508140214b7c63650a67a1e5111f503@group.calendar.google.com/public/basic.ics",
    stloup: "https://calendar.google.com/calendar/ical/fe0500e4cb7f078423e6384532189da56fd79192b150997a12417fa9b0aab91e@group.calendar.google.com/public/basic.ics",
    vannes: "https://calendar.google.com/calendar/ical/5f85b9b3b200d75b471e0cb23d2caa25acf6dba6f01af9f05f70763cb170707d@group.calendar.google.com/public/basic.ics",
    paris: "https://calendar.google.com/calendar/ical/7236a9f3fe473b7df99018e4a6142c51dc1fee1cbd3904aa1fc594ec61503b47@group.calendar.google.com/public/basic.ics",
    stebaume:
        "https://calendar.google.com/calendar/ical/755ebdf4c6e1600dd39b9d226557923b6d0029d2b079610a0fa77b69d2748ed7%40group.calendar.google.com/private-4e70e32b7b40b2f597ae7dc02384bef0/basic.ics",
    poitiers: "https://calendar.google.com/calendar/ical/38a124bdb03a1be8ceda0be59b4fb4e29cb7287e7ea22f5fe3c8a6e7b8130cd8@group.calendar.google.com/public/basic.ics",
    lyon: "https://calendar.google.com/calendar/ical/20b89722813c59cd0a2fdc2ef3a81b257f240f616fc5638330f10ed5d010f765%40group.calendar.google.com/public/basic.ics",
    grenoble: "https://p126-caldav.icloud.com/published/2/MTIwNjA2MTU3OTEyMDYwNslsLAbTXDEyQ3nzhZH4CU-QMn3vxNaC9YK5Y-YGcahz7E5HLEPO2r3F3gMviLU1cngfNABRAK2LEfTtWzgZ1io",
    montpellier: "https://calendar.google.com/calendar/ical/paroissetheophanie.ecof%40gmail.com/public/basic.ics",
    lisieux: "https://calendar.google.com/calendar/ical/2f99103a78d9eb2c14d2ca0bb7b9f0ca1a9381c5f2875689f08503b7c8d6af3c@group.calendar.google.com/public/basic.ics",
}

function cleanDescription(raw) {
    if (!raw) return ""
    return raw
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\n{3,}/g, "\n\n")
        .trim()
}

function icalTimeToString(t) {
    const jsDate = t.toJSDate()
    const parts = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(jsDate)
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "00"
    return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`
}

export async function getParishInfo(city) {
    const url = calendars[city]

    if (!url) {
        throw new Error(`City not found: ${city}`)
    }

    const response = await fetch(url)
    const icsText = await response.text()
    const jcalData = ICAL.parse(icsText)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents("vevent")

    const nowString = icalTimeToString(ICAL.Time.now())
    const maxDateString = (() => {
        const d = new Date()
        d.setFullYear(d.getFullYear() + 1)
        return icalTimeToString(ICAL.Time.fromJSDate(d))
    })()

    const allEvents = []

    for (const vevent of vevents) {
        const event = new ICAL.Event(vevent)

        if (event.isRecurring()) {
            const expand = new ICAL.RecurExpansion({
                component: vevent,
                dtstart: event.startDate,
            })

            const duration = event.endDate.subtractDate(event.startDate)

            let next = null
            while ((next = expand.next())) {
                const startStr = icalTimeToString(next)

                if (startStr > maxDateString) break

                const endTime = next.clone()
                endTime.addDuration(duration)
                const endStr = icalTimeToString(endTime)

                if (endStr < nowString) continue

                allEvents.push({
                    title: event.summary,
                    start: startStr,
                    end: endStr,
                    description: cleanDescription(event.description),
                    location: event.location,
                    uid: event.uid,
                })
            }
        } else {
            allEvents.push({
                title: event.summary,
                start: icalTimeToString(event.startDate),
                end: icalTimeToString(event.endDate),
                description: cleanDescription(event.description),
                location: event.location,
                uid: event.uid,
            })
        }
    }

    const upcomingEvents = allEvents.filter((event) => event.end >= nowString)
    upcomingEvents.sort((a, b) => a.start.localeCompare(b.start))

    return { events: upcomingEvents }
}

import ICAL from "ical.js"

const calendars: Record<string, string> = {
    angers: "https://calendar.google.com/calendar/ical/a0b13b9efa661c4e7043a1e1393ab17998b1c203459e612f07b454163b8c1471%40group.calendar.google.com/public/basic.ics",
    bordeaux: "https://calendar.google.com/calendar/ical/daba7ddef4ffb00d8fb28e21aab4cd5a63b1f895bac030fef1c375f99873dd60@group.calendar.google.com/public/basic.ics",
    amboise: "https://calendar.google.com/calendar/ical/02c5d4a8aa1e221ea68a73bb6c6843b6c1406b6305ffe2709342f939f8af9c3d@group.calendar.google.com/public/basic.ics",
    nantes: "https://calendar.google.com/calendar/ical/73bad447c0fade6c9e4fd38e50fd3d661de808ca5833249c3c4eda05fedc8550@group.calendar.google.com/public/basic.ics",
    orleans: "https://calendar.google.com/calendar/ical/a619baa6e99f4d08abee8429129ed7c3f508140214b7c63650a67a1e5111f503@group.calendar.google.com/public/basic.ics",
    stloup: "https://calendar.google.com/calendar/ical/fe0500e4cb7f078423e6384532189da56fd79192b150997a12417fa9b0aab91e@group.calendar.google.com/public/basic.ics",
    vannes: "https://calendar.google.com/calendar/ical/5f85b9b3b200d75b471e0cb23d2caa25acf6dba6f01af9f05f70763cb170707d@group.calendar.google.com/public/basic.ics",
    paris: "https://calendar.google.com/calendar/ical/7236a9f3fe473b7df99018e4a6142c51dc1fee1cbd3904aa1fc594ec61503b47@group.calendar.google.com/public/basic.ics",
    poitiers: "https://calendar.google.com/calendar/ical/38a124bdb03a1be8ceda0be59b4fb4e29cb7287e7ea22f5fe3c8a6e7b8130cd8@group.calendar.google.com/public/basic.ics",
    lyon: "https://calendar.google.com/calendar/ical/20b89722813c59cd0a2fdc2ef3a81b257f240f616fc5638330f10ed5d010f765%40group.calendar.google.com/public/basic.ics",
    grenoble: "https://p126-caldav.icloud.com/published/2/MTIwNjA2MTU3OTEyMDYwNslsLAbTXDEyQ3nzhZH4CU-QMn3vxNaC9YK5Y-YGcahz7E5HLEPO2r3F3gMviLU1cngfNABRAK2LEfTtWzgZ1io",
    montpellier: "https://calendar.google.com/calendar/ical/paroissetheophanie.ecof%40gmail.com/public/basic.ics",
    lisieux: "https://calendar.google.com/calendar/ical/2f99103a78d9eb2c14d2ca0bb7b9f0ca1a9381c5f2875689f08503b7c8d6af3c@group.calendar.google.com/public/basic.ics",
}

type CalendarEvent = {
    title: string
    start: Date
    end: Date
    description: string
    location: string
    uid: string
}

type ParishInfo = {
    events: CalendarEvent[]
}

export async function getParishInfo(city: string): Promise<ParishInfo> {
    const url = calendars[city]

    if (!url) {
        throw new Error(`City not found: ${city}`)
    }

    const response = await fetch(url)
    const icsText = await response.text()
    const jcalData = ICAL.parse(icsText)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents("vevent")

    const now = new Date()
    const maxDate = new Date(now)
    maxDate.setFullYear(maxDate.getFullYear() + 1) // horizon d'un an

    const allEvents: CalendarEvent[] = []

    for (const vevent of vevents) {
        const event = new ICAL.Event(vevent)

        if (event.isRecurring()) {
            // Développer toutes les occurrences dans la fenêtre [now, maxDate]
            const expand = new ICAL.RecurExpansion({
                component: vevent,
                dtstart: event.startDate,
            })

            const duration = event.endDate.subtractDate(event.startDate)

            let next: ICAL.Time | null
            while ((next = expand.next())) {
                const startJS = next.toJSDate()

                if (startJS > maxDate) break

                const endTime = next.clone()
                endTime.addDuration(duration)
                const endJS = endTime.toJSDate()

                if (endJS < now) continue

                allEvents.push({
                    title: event.summary,
                    start: startJS,
                    end: endJS,
                    description: event.description,
                    location: event.location,
                    uid: event.uid,
                })
            }
        } else {
            // Événement simple, comportement inchangé
            allEvents.push({
                title: event.summary,
                start: event.startDate.toJSDate(),
                end: event.endDate.toJSDate(),
                description: event.description,
                location: event.location,
                uid: event.uid,
            })
        }
    }

    const upcomingEvents = allEvents.filter((event) => event.end >= now)
    upcomingEvents.sort((a, b) => a.start.getTime() - b.start.getTime())

    return { events: upcomingEvents }
}

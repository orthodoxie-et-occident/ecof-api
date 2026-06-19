<p align="center">
  <img src="ecof.png" alt="ECOF" width="300"/>
</p>

<p align="center">
  Backend API for the <em>Eglise Catholique Orthodoxe de France</em> mobile application.
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
  <img alt="Built with Bun" src="https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white" />
  <img alt="Built with Hono" src="https://img.shields.io/badge/Hono-4-E36002?logo=hono&logoColor=white" />
</p>

---

## About

`ecof-api` is the backend serving the [ecof-app](https://github.com/jrc0de/ecof-app) mobile application. It provides parish data, the liturgical calendar, saints' lives (vita), daily readings, the synaxarion, news, and other content consumed by the app.

The API is built with [Hono](https://hono.dev/) on the [Bun](https://bun.sh/) runtime, and stores its data in MySQL.

## Architecture

```mermaid
flowchart LR
    DB[(MySQL)] --> API["ecof-api"]
    API --> APP["ecof-app"]
    APP --> WEB["Web"]
    APP --> AND["Android"]
    APP --> IOS["iOS"]
 
    classDef db fill:#4A6FA5,stroke:#4A6FA5,color:#fff
    classDef api fill:#6E7681,stroke:#6E7681,color:#fff
    classDef app fill:#B3995B,stroke:#B3995B,color:#fff
    classDef device fill:#D4B483,stroke:#D4B483,color:#fff
 
    class DB db
    class API api
    class APP app
    class WEB,AND,IOS device
```

## API Routes

All routes are prefixed with `/api`.

| Route         | Description                          |
| ------------- | ------------------------------------ |
| `/calendar`   | Liturgical calendar (iCalendar)      |
| `/parish`     | Parish directory                     |
| `/vita`       | Saints' lives                        |
| `/news`       | News and articles (Markdown content) |
| `/reading`    | Daily liturgical readings            |
| `/synaxar`    | Synaxarion (calendar of saints)      |
| `/images`     | Image assets                         |
| `/privacy`    | Privacy policy content               |
| `/support`    | Support / contact information        |
| `/monitoring` | Vita content monitoring              |
| `/app-config` | Mobile app configuration             |
| `/map-data`   | Map data for the parish map          |

## Tech Stack

| Layer                | Technology                                                                       |
| -------------------- | -------------------------------------------------------------------------------- |
| Runtime              | [Bun](https://bun.sh/)                                                           |
| Framework            | [Hono](https://hono.dev/)                                                        |
| Database             | MySQL                                                                            |
| Calendar parsing     | [ical.js](https://github.com/kewisch/ical.js)                                    |
| Markdown rendering   | [marked](https://marked.js.org/)                                                 |
| Linting / formatting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [oxfmt](https://oxc.rs/) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- A MySQL database instance

### Installation

```bash
git clone https://github.com/jrc0de/ecof-api.git
cd ecof-api
bun install
```

### Configuration

The API connects to a MySQL database.

### Development

Run the API with hot reload:

```bash
bun run dev
```

## Linting & Formatting

```bash
bun run lint        # check for lint issues
bun run lint:fix     # auto-fix lint issues
bun run fmt          # format code
```

## Related Projects

- [ecof-app](https://github.com/jrc0de/ecof-app) — official mobile and web application (Ionic Vue + Capacitor) consuming this API

## License

This project is licensed under the [MIT License](LICENSE).

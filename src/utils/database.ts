import { SQL } from "bun"

export const db = new SQL({
    adapter: "mysql",
    hostname: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: true,
    tls: true,
    max: 10,
})

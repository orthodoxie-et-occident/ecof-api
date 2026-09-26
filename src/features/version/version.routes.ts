import { Hono } from "hono"

export const versionRoutes = new Hono()

const APP_VERSIONS = {
  ios: {
    latestVersion: "3.6.1",
    storeUrl: "https://apps.apple.com/fr/app/ecof/id6762153654",
  },
  android: {
    latestVersion: "3.6.1",
    storeUrl: "https://play.google.com/store/apps/details?id=app.ecof.www",
  },
}

versionRoutes.get("/", (c) => c.json(APP_VERSIONS))

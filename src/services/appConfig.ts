export function getAppConfig() {
    return {
        versions: {
            ios: {
                latest: "1.0.0",
                minimum: "1.0.0",
            },
            android: {
                latest: "3.0.0",
                minimum: "1.0.0",
            },
        },
        store_urls: {
            ios: "https://apps.apple.com/app/idXXXXXXXXX",
            android: "https://play.google.com/store/apps/details?id=app.ecof.www",
        },
    }
}

export default {
    DEVICE_NAME: process.env.DEVICE_NAME || "device",
    API_KEY: process.env.API_KEY || "secret",
    WEBHOOK_URL: process.env.WEBHOOK_URL || "",

    // CLIENT
    SERVER_ADDR: process.env.SERVER_ADDR || "ws://192.168.0.100:10001",
    GROUP: process.env.GROUP || "production",

    // WATCHER
    COMMAND: process.env.COMMAND || "start https://www.youtube.com/@MinatoAqua",

    // SERVER
    PORT: process.env.PORT || 8082,
}
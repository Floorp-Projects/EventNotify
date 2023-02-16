export default {
    DEVICE_NAME: process.env.DEVICE_NAME || "device",
    API_KEY: process.env.API_KEY || "secret",
    
    // CLIENT
    SERVER_ADDR: process.env.SERVER_ADDR || "ws://localhost:8082",
    GROUP: process.env.GROUP || "production",

    // WATCHER
    COMMAND: process.env.COMMAND || "start https://www.youtube.com/@MinatoAqua",

    // SERVER
    PORT: process.env.PORT || 8082,
}
export default {
    log: {
        error: (text: string): void => console.error(`\x1b[31mERROR\x1b[39m: ${text}`),
        info: (text: string): void => console.info(`\x1b[36mINFO\x1b[39m: ${text}`),
        startup: (info: {device: string, type: string, addr: string}) => {
            console.log("-------------------------------");
            console.log(`Type: ${info.type}`);
            console.log(`Device: ${info.device}`);
            console.log(`Addr: ${info.addr}`);
            console.log("-------------------------------");
        }
    },
    Handshake: (data: any): string => JSON.stringify(data),
    HandshakeParse: (data: string) => JSON.parse(data),
    HandshakeLog: (handshake: any) => `Handshake ${handshake.code !== 200?"Failed":"Done"} (${handshake.type}/${handshake.code}/${handshake.device})`
}
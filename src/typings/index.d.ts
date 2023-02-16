const enum ConnectionType {
    Notice = "notice",
    Watch = "watch",
}
 
interface ConnectionHandshake {
    type: ConnectionType,
    device: string,
    group: string
}
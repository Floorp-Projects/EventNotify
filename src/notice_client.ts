import WebSocket from "ws";
import utils from "./utils";
import env from "./env";

const ws = new WebSocket(env.SERVER_ADDR, { headers: { authorization: env.API_KEY } });
utils.log.startup({device: env.DEVICE_NAME, type: "NOTICE", addr: env.SERVER_ADDR});

ws.once("open", () =>{
    const connection: ConnectionHandshake = { type: ConnectionType.Notice, device: env.DEVICE_NAME, group: env.GROUP };
    ws.send(JSON.stringify(connection));
    utils.log.info("Connected");

    ws.once("message", (payload: string) =>{
        const response: ConnectionHandshake = JSON.parse(payload);
        if(response.group !== env.GROUP || response.type !== ConnectionType.Notice) return;
        if(response.device !== env.DEVICE_NAME) return;
        utils.log.info("Success");
        ws.close();
    });
});
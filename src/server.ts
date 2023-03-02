import WebSocket, { WebSocketServer } from "ws";
import { Webhook } from "discord-webhook-node";
import { IncomingMessage } from "http";
import utils from "./utils";
import env from "./env";

const wss = new WebSocketServer({ port: 8082 });
const webhook = new Webhook(env.WEBHOOK_URL);

utils.log.startup({device: env.DEVICE_NAME, type: "SERVER", addr: `ws://localhost:${env.PORT}`});

wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
    if(env.API_KEY !== request.headers?.authorization) return utils.log.error(`Invalid KEY (IP: '${request.socket.remoteAddress}')`);
    utils.log.info(`Client connected (IP: '${request.socket.remoteAddress}')`);

    ws.on("message", (payload) =>{
        const message: ConnectionHandshake = JSON.parse(payload.toString());
        if(message.type === ConnectionType.Notice) utils.log.info(`Receive notice (${message.group}/${message.device})`);
        if(message.type === ConnectionType.Watch){
            utils.log.info(`Join new watcher (${message.group}/${message.device})`);
            webhook.send(utils.webhook.join("New watcher joined", `Device: ${message.device}\nGroup: ${message.group}`, "SERVER"))
        }
        wss.clients.forEach((client: WebSocket) =>{
            const event: ConnectionHandshake = { type: message.type, device: message.device, group: message.group, argv: message.argv };
            client.send(JSON.stringify(event));
        });
        utils.log.info(`Event deliver success (${message.group})\n`);
        if(env.WEBHOOK_URL){
            webhook.send(utils.webhook.success("Event deliver success", `Device: ${message.device}\nGroup: ${message.group}\nType: ${message.type.toUpperCase()}`, "SERVER"))
        }
    });
});
import { exec } from "child_process";
import WebSocket from "ws";
import utils from "./utils";
import env from "./env";

const ws = new WebSocket("ws://localhost:8082", { headers: { authorization: env.API_KEY } });
utils.log.startup({device: env.DEVICE_NAME, type: "WATCH", addr: env.SERVER_ADDR});

ws.on("open", () =>{
    const connection: ConnectionHandshake = { type: ConnectionType.Watch, device: env.DEVICE_NAME, group: env.GROUP };
    ws.send(JSON.stringify(connection));
    utils.log.info("Connecting...");

    ws.on("message", (payload: string) =>{
        const response: ConnectionHandshake = JSON.parse(payload);
        if(response.group !== env.GROUP) return;
        if(response.type === ConnectionType.Watch){
            if(response.device === env.DEVICE_NAME){
                utils.log.info(`Join event group (${response.group})\n`);
            }else{
                utils.log.info(`Join new watcher (${response.device})\n`);
            }
            return;
        }

        if(response.type !== ConnectionType.Notice) return;
        utils.log.info("Excute command");
        exec(env.COMMAND, { encoding: "utf-8" }, (err, stdout, stderr) =>{
            if(err) return utils.log.error(stderr);
            utils.log.info(stdout);
        });
    });
});
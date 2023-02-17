import WebSocket from "ws";
import { Webhook } from "discord-webhook-node";
import { exec } from "child_process";
import utils from "./utils";
import env from "./env";

const ws = new WebSocket(env.SERVER_ADDR, { headers: { authorization: env.API_KEY } });
const webhook = new Webhook(env.WEBHOOK_URL);
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
        webhook.send(utils.webhook.success("Command excute", "command starting", response.device));
        exec(env.COMMAND, { encoding: "utf-8" }, (err, stdout, stderr) =>{
            if(err){
                if(stderr === "") stderr = "*none*"
                webhook.send(utils.webhook.error("Command execute error", `\`\`\`${stderr}\`\`\``, response.device));
                return utils.log.error(stderr);
            }
            if(stdout === "") stdout = "*none*"
            webhook.send(utils.webhook.success("Command excute success", `\`\`\`${stdout}\`\`\``, response.device));
            utils.log.info(stdout);
        });
    });
});
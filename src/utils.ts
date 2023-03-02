import { MessageBuilder } from "discord-webhook-node";

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
    webhook: {
        success: (title: string, description: string, device: string) =>{
            return new MessageBuilder()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(device)
            .setColor(parseInt("a8f79a", 16));
        },
        wait: (title: string, description: string, device: string) =>{
            return new MessageBuilder()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(device)
            .setColor(parseInt("f7f49a", 16));
        },
        error: (title: string, description: string, device: string) =>{
            return new MessageBuilder()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(device)
            .setColor(parseInt("f79a9a", 16));
        },
        join: (title: string, description: string, device: string) =>{
            return new MessageBuilder()
            .setTitle(title)
            .setDescription(description)
            .setAuthor(device)
            .setColor(parseInt("9a9bf7", 16));
        }
    }
}
#!/usr/bin/env node
import axios from "axios";
import * as dotenv from "dotenv";
import { Qiita } from "@/types/qiita";

dotenv.config({ path: __dirname+'/.env' });

export async function main() {
    const res = await axios.get<Qiita[]>("https://qiita.com/api/v2/items");

    const webhookUrl: string = process.env.DISCORD_WEB_HOOK_URL ?? "";

    res.data.map(async data => {
        const requestBody = {
            content: data.title,
            embeds: [{
                type: "link",
                title: data.title,
                description: "",
                url: data.url,
            }],
        };

        await axios.post(webhookUrl, requestBody)
            .then(response => {
                console.log(response.status);
                console.log(response.statusText);
            })
            .catch((error) => {
                console.error("Error sending webhook:", error);
            });
    });
}

if (require.main === module) {
  main();
}

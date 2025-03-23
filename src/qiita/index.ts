#!/usr/bin/env node
import type { DiscordWebhookData } from "@/commons/discord"
import { getLocalEnv } from "@/commons/get-local-env"
import type { Qiita } from "@/qiita/types/qiita"
import axios from "axios"

const QIITA_URL = "https://qiita.com/api/v2/items"

export async function main() {
  getLocalEnv()

  const res = await axios.get<Qiita[]>(QIITA_URL)
  const webhookUrl: string = process.env.DISCORD_WEB_HOOK_URL_FOR_QIITA ?? ""

  for (const data of res.data) {
    const requestBody: DiscordWebhookData = {
      content: data.title,
      embeds: [
        {
          type: "link",
          title: data.title,
          description: "",
          url: data.url,
        },
      ],
    }

    await axios
      .post(webhookUrl, requestBody)
      .then(response => {
        console.log(response.status)
        console.log(response.statusText)
      })
      .catch(error => {
        console.error("Error sending webhook:", error)
        throw new Error(error.message)
      })
  }
}

if (require.main === module) {
  main()
}

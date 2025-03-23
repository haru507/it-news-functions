#!/usr/bin/env node
import { getLocalEnv } from "@/get-local-env"
import type { DiscordWebhookData } from "@/types/discord"
import type { Zenn } from "@/zenn/types/zenn"
import axios from "axios"

const ZENN_BASE_URL = "https://zenn.dev"
const ZENN_API_PATH = "/api/articles?order=latest"

export async function main() {
  getLocalEnv()

  const res = await axios.get<Zenn>(`${ZENN_BASE_URL}${ZENN_API_PATH})`)
  const webhookUrl: string = process.env.DISCORD_WEB_HOOK_URL_FOR_ZENN ?? ""

  for (const data of res.data.articles) {
    const requestBody: DiscordWebhookData = {
      content: data.title,
      embeds: [
        {
          type: "link",
          title: data.title,
          description: "",
          url: `${ZENN_BASE_URL}${data.path}`,
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
      })
  }
}

if (require.main === module) {
  main()
}

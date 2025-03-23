#!/usr/bin/env node
import type { DiscordWebhookData } from "@/commons/discord"
import { getLocalEnv } from "@/commons/get-local-env"
import type { Data } from "@/note/types/note"
import axios from "axios"

const NOTE_URL = "https://note.com/api/v1/categories/tech?note_intro_only=true&sort=new&page=1"

export async function main() {
  getLocalEnv()

  const res = await axios.get<Data>(NOTE_URL)
  const notes = res.data.data.notes

  const webhookUrl: string = process.env.DISCORD_WEB_HOOK_URL_FOR_NOTE ?? ""
  console.log("webhook URL: ", webhookUrl)

  for (const note of notes) {
    const requestBody: DiscordWebhookData = {
      content: note.name,
      embeds: [
        {
          type: "link",
          title: note.name,
          description: "",
          url: note.note_url,
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

export interface DiscordWebhookData {
  content: string
  embeds: Embed[]
}

export interface Embed {
  type: string
  title: string
  description: string
  url: string
}

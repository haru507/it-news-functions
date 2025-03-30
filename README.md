# IT News Functions

このプロジェクトは、様々なITニュースサイト（Note、Qiita、Zenn）から最新の記事を取得し、DiscordチャンネルにWebhook経由で送信します。

## 概要

このプロジェクトは、以下の主要なコンポーネントで構成されています。

**注意:** Discord APIにはレート制限があります。スクリプトの実行頻度が高すぎると、API制限に達する可能性があります。必要に応じて、スクリプトの実行間隔を調整してください。

- **src/note/index.ts**: Noteの技術カテゴリから最新の記事を取得し、Discordチャンネルに送信します。
- **src/qiita/index.ts**: Qiitaから最新の記事を取得し、Discordチャンネルに送信します。
- **src/zenn/index.ts**: Zennから最新の記事を取得し、Discordチャンネルに送信します。
- **src/commons/discord.ts**: Discord Webhookのデータ構造を定義します。
- **src/commons/get-local-env.ts**: `.env`ファイルから環境変数を読み込みます。
- **src/.env**: Discord WebhookのURLを含む環境変数が含まれています。

## セットアップ

1.  **依存関係のインストール:**

    ```bash
    pnpm install
    ```

2.  **環境変数の設定:**

    以下の内容で`.env`ファイルを`src/`ディレクトリに作成します。

    ```
    APP_ENV=local
    DISCORD_WEB_HOOK_URL_FOR_NOTE=<NoteのDiscord Webhook URL>
    DISCORD_WEB_HOOK_URL_FOR_QIITA=<QiitaのDiscord Webhook URL>
    DISCORD_WEB_HOOK_URL_FOR_ZENN=<ZennのDiscord Webhook URL>
    ```

    `<NoteのDiscord Webhook URL>`、`<QiitaのDiscord Webhook URL>`、`<ZennのDiscord Webhook URL>`を実際のDiscord Webhook URLに置き換えてください。

3.  **スクリプトの実行:**

    以下のコマンドを使用して、各スクリプトを個別に実行できます。

    ```bash
    pnpm ts-node src/note/index.ts
    pnpm ts-node src/qiita/index.ts
    pnpm ts-node src/zenn/index.ts
    ```

## GitHub Actions

このプロジェクトでは、GitHub Actionsを使用して、スケジュールに基づいてスクリプトを自動的に実行します。ワークフローファイルは、`.github/workflows/`ディレクトリにあります。

- **.github/workflows/node_exec_note.yml**: Noteスクリプトを実行します。
- **.github/workflows/node_exec_qiita.yml**: Qiitaスクリプトを実行します。
- **.github/workflows/node_exec_zenn.yml**: Zennスクリプトを実行します。

## 依存関係

- axios
- dotenv

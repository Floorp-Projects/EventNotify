# Event Notify

GitHub Actions等のポート開放などが出来ないデバイスからのイベント通知を助けます。

## Use

- NodeJS v18.14.0 LTS
- Yarn 1.22.18
- Docker (Compose v3.9) *サーバーのみ

動作には上記の環境が必要になります。

このリポジトリをクローンしてください。

- [イベント送信側](#イベント送信側)
- [イベント受信側](#イベント受信側)
- [中継サーバー](#中継サーバー)

### イベント送信側

1. `src/env.ts`を変更するか対応した環境変数を設定してください。

```ts
DEVICE_NAME: process.env.DEVICE_NAME || "わかりやすい端末名を設定",
API_KEY: process.env.API_KEY || "サーバー側から提供される認証キーを入力",
    
// CLIENT
SERVER_ADDR: process.env.SERVER_ADDR || "サーバーのアドレスを入力",
GROUP: process.env.GROUP || "接続するグループ名を入力",
```

2. 依存パッケージをインストール

```bash
yarn install
```

3. 実行

*実行すると即座に通知を送信します。

```bash
yarn client:notice [...argv]
```

### イベント受信側

1. `src/env.ts`を変更するか対応した環境変数を設定してください。

```ts
DEVICE_NAME: process.env.DEVICE_NAME || "わかりやすい端末名を設定",
API_KEY: process.env.API_KEY || "サーバー側から提供される認証キーを入力",
    
// CLIENT
SERVER_ADDR: process.env.SERVER_ADDR || "サーバーのアドレスを入力",
GROUP: process.env.GROUP || "接続するグループ名を入力",

// WATCHER
COMMAND: process.env.COMMAND || "実行するコマンドを入力",
```

2. 依存パッケージをインストール

```bash
yarn install
```

3. 実行

*停止するまで動作し続けます。

```bash
yarn client:watch
```

### 中継サーバー

1. `docker-compose.yml`を編集します。

2. 実行

```bash
docker compose up -d
```
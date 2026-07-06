# 🔥 Ignite Timer

行動を起こすための3つの心理学的アプローチを実践するタイマーアプリケーションです。

## 3つのルール

| ルール | 時間 | 概要 |
|--------|------|------|
| ⚡ 5秒ルール | 5秒 | オートパイロットを遮断し、即座に行動を開始させる |
| 🏃 2分間ルール | 2分 | タスクの初期起動に必要な摩擦を下げ、行動を開始した事実を作る |
| 🔥 10分間ルール | 10分 | ツァイガルニク効果と行動活性化を利用し、作業の継続を促す |

## 技術スタック

- **フロントエンド**: React 19 + TypeScript + Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui (base-ui)
- **バックエンド**: Hono (Cloudflare Workers)
- **ビルドツール**: Vite
- **テスト**: Vitest + Playwright

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

## 利用可能なコマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | ビルド |
| `npm run preview` | Wranglerでプレビュー |
| `npm test` | 単体テスト実行 |
| `npm run test:watch` | 単体テスト (watchモード) |
| `npm run test:e2e` | E2Eテスト実行 |
| `npm run deploy` | Cloudflare Workersにデプロイ |

# コントリビューションガイド

## ブランチ戦略

- `main`ブランチへの直接pushは禁止です
- すべての変更はfeatureブランチからPRを作成して行います
- PRはレビュー後にマージします

## 開発フロー

1. `main`ブランチからfeatureブランチを作成します
   ```bash
   git checkout -b feature/your-feature main
   ```

2. 変更をコミットします
   ```bash
   git add .
   git commit -m "feat: 変更内容"
   ```

3. リモートにpushします
   ```bash
   git push origin feature/your-feature
   ```

4. GitHubでPRを作成します

5. レビュー後にマージします

## コミットメッセージ

Conventional Commitsに従います。

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントの変更
- `style:` コードのスタイル変更（機能的な変更なし）
- `refactor:` リファクタリング
- `test:` テストの追加・修正
- `chore:` ビルドプロセスやツールの変更

## テスト

変更後は必ずテストを実行してください。

```bash
npm test
```

## ビルド

ビルドが成功することを確認してください。

```bash
npm run build
```

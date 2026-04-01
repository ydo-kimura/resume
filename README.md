# resume

シンプルな職務経歴書 PDF 作成ツールです。

PDF出力に必要な要素をコンテナ内で用意しているので、CLIにはせず、クローンしてプロジェクトとして実行されることを想定しています。  
利用される方のご都合にあわせて、適宜カスタマイズして、ご活用ください。

## 開発環境（Dev Container 前提）

このプロジェクトは、Dev Container 対応 IDE（例: VS Code, Cursor, Intellij IDEA など）で
「Dev Container として開く」ことを前提としています。

- イメージ作成時に、PDF 出力用の日本語フォント（`font-noto-cjk`）と Playwright（Chromium 含む）をインストールします。
- 依存パッケージのインストール（`pnpm install`）はコンテナ作成時に自動実行されます。

## 開発

ローカルサーバを起動してブラウザでプレビューしながら編集する場合:

```bash
pnpm dev
```

- `http://localhost:8080` で `dist` の内容を確認できます。
- 変更は自動ビルドされ、画面がリロードされます。

ビルドのみを監視したい場合:

```bash
pnpm watch
```

単発で HTML をビルドする場合:

```bash
pnpm build
```

- 出力先: `dist/`

## 品質チェック

型チェック:

```bash
pnpm typecheck
```

ESLint による静的解析:

```bash
pnpm lint
```

Prettier でソースコードを整形:

```bash
pnpm format
```

## YAML データ編集

職務経歴書の内容は `_data/resume.yaml` を編集して更新します。

- スキーマ定義: `src/schemas/resume.schema.json`
- 氏名: `basic_info.rows` の `type: name`（`family`, `given`）
- 生年月日: `basic_info.rows` の `type: birth_date`（`birth_date: YYYY-MM-DD`）
- 資格: `basic_info.rows` の `type: certifications`（`title`, `acquired_at: YYYY/M or YYYY/MM`）
- 職務経歴: `work_history.companies[].projects[]`（`title`, `start`, `end`, `role`, `tasks`, `environment`）

## PDF 出力

HTML ビルドと PDF 出力をまとめて実行します。

```bash
pnpm pdf
```

- 出力先: `dist/職務経歴書_<name>.pdf`
- `<name>` は `_data/resume.yaml` の氏名（`basic_info.rows` の `type: name` の `family` と `given` を連結した文字列）から生成されます。
- 出力イメージの例: `example/職務経歴書_山田太郎.pdf`
- Dev Container 内に生成された PDF は、ファイルを右クリックして **Download** を選択するとローカルマシンに保存できます。

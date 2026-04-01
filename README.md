# resume

シンプルな職務経歴書 PDF 作成ツールです。

PDF出力に必要な要素をコンテナ内で用意しているので、CLIにはせず、クローンしてプロジェクトとして実行されることを想定しています。  
利用される方のご都合にあわせて、適宜カスタマイズして、ご活用ください。

## 開発環境（Dev Container 前提）

このプロジェクトは、Dev Container 対応 IDE（例: VS Code, Cursor, Intellij IDEA など）で
「Dev Container として開く」ことを前提としています。

- イメージ作成時に、PDF 用の日本語フォント（`fonts-noto-cjk`）と Playwright の Chromium 向け OS 依存（`playwright install-deps chromium`）をインストールします。
- Chromium ブラウザ本体の取得と依存パッケージのインストール（`pnpm install --frozen-lockfile`）は、コンテナ初回作成時に自動実行されます。

### `.devcontainer/.env`（任意）

初回に `.devcontainer/.env` が無いとき、`initializeCommand`（`.devcontainer/initialize-command.sh`）が [`.devcontainer/.env.example`](.devcontainer/.env.example) を `.devcontainer/.env` にコピーします。

`.env.example` の内容は次のとおりです。エディタ、IDE に合わせて `GIT_EDITOR` を変更してください。

```bash
GIT_EDITOR=vi
# GIT_EDITOR=code --wait
# GIT_EDITOR=cursor --wait
# GIT_EDITOR=agy --wait
```

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

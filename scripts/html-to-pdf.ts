import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import yaml from "js-yaml";
import { chromium } from "playwright";

type ResumeData = {
  basic_info?: {
    rows?: Array<{
      type?: string;
      family?: string;
      given?: string;
    }>;
  };
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const htmlPath = path.join(rootDir, "dist", "index.html");
const yamlPath = path.join(rootDir, "_data", "resume.yaml");

function sanitizeFilename(value: string): string {
  const invalidChars = new Set(["<", ">", ":", '"', "/", "\\", "|", "?", "*"]);
  const sanitized = Array.from(value, (char) => {
    const code = char.charCodeAt(0);
    if (code <= 31 || invalidChars.has(char)) {
      return "_";
    }
    return char;
  }).join("");
  return sanitized.replace(/\s+/g, "").trim();
}

function getNameFromResumeYaml(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    return "unknown";
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw) as ResumeData | undefined;
  const rows = parsed?.basic_info?.rows ?? [];
  const nameRow = rows.find((row) => row.type === "name");
  const family = nameRow?.family?.trim() ?? "";
  const given = nameRow?.given?.trim() ?? "";
  const combined = `${family}${given}`.trim();
  return combined.length > 0 ? combined : "unknown";
}

if (!fs.existsSync(htmlPath)) {
  console.error("dist/index.html がありません。先に pnpm run build を実行してください。");
  process.exit(1);
}

const name = sanitizeFilename(getNameFromResumeYaml(yamlPath));
const outputPath = path.join(rootDir, "dist", `職務経歴書_${name}.pdf`);

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`PDF を出力しました: ${outputPath}`);
} finally {
  await browser.close();
}

import yaml from "js-yaml";

import { formatBirthDateJp } from "./src/lib/formatBirthDateJp.js";
import { formatYearMonthJp } from "./src/lib/formatYearMonthJp.js";

/** Eleventy の UserConfig で本プロジェクトが使う API のみ */
interface EleventyUserConfig {
  addDataExtension(extension: string, parser: (contents: string) => unknown): void;
  addPassthroughCopy(path: string): void;
  addFilter(name: string, callback: (...args: unknown[]) => unknown): void;
}

export default function (eleventyConfig: EleventyUserConfig) {
  eleventyConfig.addDataExtension("yaml", (contents: string) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents: string) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addFilter("birthDateJp", (isoDate: unknown) =>
    typeof isoDate === "string" ? formatBirthDateJp(isoDate) : "",
  );
  eleventyConfig.addFilter("yearMonthJp", (yearMonth: unknown) =>
    typeof yearMonth === "string" ? formatYearMonthJp(yearMonth) : "",
  );
  eleventyConfig.addFilter("todayJp", () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(now);
    const year = parts.find((part) => part.type === "year")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const day = parts.find((part) => part.type === "day")?.value ?? "";
    return `${year}年${month}月${day}日 現在`;
  });
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "../_data",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"],
  };
}

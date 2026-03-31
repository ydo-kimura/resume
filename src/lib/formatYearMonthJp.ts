/**
 * 年月（YYYY/M または YYYY/MM）を「YYYY年M月」に整形する。
 */
export function formatYearMonthJp(yearMonth: string): string {
  const m = /^(\d{4})\/(0?[1-9]|1[0-2])$/.exec(yearMonth.trim());
  if (!m) {
    throw new Error(`Invalid year_month (expected YYYY/M or YYYY/MM): ${yearMonth}`);
  }
  const year = Number(m[1]);
  const month = Number(m[2]);
  return `${year}年${month}月`;
}

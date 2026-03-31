/**
 * ISO 日付（YYYY-MM-DD）を「YYYY年M月D日（満N歳）」に整形する。
 * 基準日は既定でビルド実行時のローカル日付（`new Date()`）。
 */
export function formatBirthDateJp(isoDate: string, now: Date = new Date()): string {
  const birth = parseIsoLocalDate(isoDate);
  const age = computeFullAge(birth, now);
  return `${formatJpDate(birth)}（満${age}歳）`;
}

function parseIsoLocalDate(iso: string): Date {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(iso.trim());
  if (!m) {
    throw new Error(`Invalid birth_date (expected YYYY-MM-DD): ${iso}`);
  }
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  return new Date(y, mo - 1, d);
}

/** 満年齢（誕生日を迎えるまでの年齢） */
function computeFullAge(birth: Date, ref: Date): number {
  let age = ref.getFullYear() - birth.getFullYear();
  if (
    ref.getMonth() < birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

function formatJpDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

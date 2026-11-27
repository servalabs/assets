/**
 * Money amounts in incident text ("$5 billion", "€1.2 billion", "₹500 crore",
 * "US$95 million", "$600m"). Only currency amounts — percentages and bare
 * numbers never match. Used by RiskMatrix's opt-in `highlightMoney` and
 * exported so host variants (e.g. servalabs.com's phone version) can reuse it.
 */
export const MONEY_RE =
  /(?:US\$|\$|€|£|₹)\s?\d+(?:,\d+)*(?:\.\d+)?(?:(?:\s?(?:million|billion|trillion|crores?|lakhs?|bn))\b|(?:m|k)\b)?/gi;

export interface MoneySegment {
  text: string;
  money: boolean;
}

/** Split text into plain and money segments (in order; joined they equal the input). */
export function splitMoney(text: string): MoneySegment[] {
  const out: MoneySegment[] = [];
  let last = 0;
  for (const match of text.matchAll(MONEY_RE)) {
    const start = match.index ?? 0;
    if (start > last) out.push({ text: text.slice(last, start), money: false });
    out.push({ text: match[0], money: true });
    last = start + match[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), money: false });
  return out;
}

/** Every money amount found in the text, in order. */
export function findMoney(text: string): string[] {
  return Array.from(text.matchAll(MONEY_RE), (m) => m[0]);
}

export function hasMoney(...texts: string[]): boolean {
  return texts.some((t) => findMoney(t).length > 0);
}

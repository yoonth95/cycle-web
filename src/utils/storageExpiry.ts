type StoredItem<T> = { value: T; expiry: number };

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_TIMEZONE = "Asia/Seoul";

const kstFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: KST_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

const getNumericPart = (parts: Intl.DateTimeFormatPart[], type: "year" | "month" | "day" | "hour" | "minute" | "second") => {
  const part = parts.find((item) => item.type === type)?.value;
  return part ? Number(part) : 0;
};

/** Returns ms until the next midnight in Asia/Seoul */
export const msUntilNextKstMidnight = (now: Date = new Date()) => {
  const parts = kstFormatter.formatToParts(now);
  const year = getNumericPart(parts, "year");
  const month = getNumericPart(parts, "month");
  const day = getNumericPart(parts, "day");
  const hour = getNumericPart(parts, "hour");
  const minute = getNumericPart(parts, "minute");
  const second = getNumericPart(parts, "second");

  const currentKst = Date.UTC(year, month - 1, day, hour, minute, second);
  const nextMidnightKst = Date.UTC(year, month - 1, day + 1, 0, 0, 0);
  const diff = nextMidnightKst - currentKst;

  return diff > 0 ? diff : DAY_MS;
};

/** ms 단위 TTL로 저장 */
export function setStorageExpiry<T>(key: string, value: T, ttlMs: number) {
  if (!isBrowser()) return;

  const item: StoredItem<T> = { value, expiry: Date.now() + ttlMs };

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`[storageExpiry] failed to persist key: ${key}`, error);
  }
}

/** 만료 시 null 반환 및 자동 삭제 */
export function getStorageExpiry<T>(key: string): T | null {
  if (!isBrowser()) return null;

  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredItem<T>;
    if (typeof parsed?.expiry !== "number") {
      localStorage.removeItem(key);
      return null;
    }

    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.value as T;
  } catch (error) {
    console.error(`[storageExpiry] failed to read key: ${key}`, error);
    localStorage.removeItem(key);
    return null;
  }
}

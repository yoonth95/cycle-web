type StoredItem<T> = { value: T; expiry: number };

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

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

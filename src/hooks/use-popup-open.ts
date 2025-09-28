"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { getStorageExpiry, setStorageExpiry } from "@/utils/storageExpiry";
import type { PopupItem } from "@/types/popup";

interface UsePopupOpenOptions {
  ttlMs?: number;
  listenStorage?: boolean;
  serverAllows?: (data: unknown) => boolean;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function usePopupOpen<TData = PopupItem[]>(
  query: UseQueryResult<TData, unknown>,
  localKey: string,
  { ttlMs = ONE_DAY_MS, listenStorage = true, serverAllows }: UsePopupOpenOptions = {},
) {
  const [suppressed, setSuppressed] = useState<boolean | null>(null);

  const evaluateSuppressed = useCallback(() => {
    const stored = getStorageExpiry<boolean>(localKey);
    setSuppressed(stored === true);
  }, [localKey]);

  useEffect(() => {
    evaluateSuppressed();
  }, [evaluateSuppressed]);

  useEffect(() => {
    if (!listenStorage) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== localKey) return;
      evaluateSuppressed();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [evaluateSuppressed, listenStorage, localKey]);

  const suppressForToday = useCallback(() => {
    setStorageExpiry(localKey, true, ttlMs);
    setSuppressed(true);
  }, [localKey, ttlMs]);

  const closeNow = useCallback(() => {
    setSuppressed(true);
  }, []);

  const allowNow = useCallback(() => {
    setSuppressed(false);
  }, []);

  const serverOK = useMemo(() => {
    if (serverAllows) return serverAllows(query.data);
    if (Array.isArray(query.data)) return query.data.length > 0;
    return Boolean(query.data);
  }, [query.data, serverAllows]);

  const ready = suppressed !== null;
  const open = ready && !suppressed && serverOK;

  return {
    ...query,
    open,
    ready,
    closeNow,
    suppressForToday,
    allowNow,
    suppressed: suppressed ?? false,
  };
}

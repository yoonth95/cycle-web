import { PopupItem, PopupItemSchema } from "@/types/popup";

type PopupResponse = { popups?: PopupItem[]; error?: string };

export const getPopups = async (): Promise<PopupItem[]> => {
  try {
    const response = await fetch("/api/popups", { method: "GET" });
    if (!response.ok) {
      console.error("[popup] failed to load popups", response.statusText);
      return [];
    }

    const payload: PopupResponse = await response.json();

    const parsed = PopupItemSchema.array().safeParse(payload.popups ?? []);
    if (!parsed.success) {
      console.error("[popup] invalid popup payload", parsed.error);
      return [];
    }

    return parsed.data;
  } catch (error) {
    console.error("[popup] unexpected fetch error", error);
    return [];
  }
};

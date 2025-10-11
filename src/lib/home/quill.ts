import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import DOMPurify from "isomorphic-dompurify";

export type QuillDelta = { ops?: Array<Record<string, unknown>> } | null | undefined;

export function deltaToHtml(delta: QuillDelta): string {
  if (!delta || !Array.isArray(delta.ops)) return "";
  try {
    const converter = new QuillDeltaToHtmlConverter(delta.ops as Array<Record<string, unknown>>, {
      encodeHtml: true,
    });
    const raw = converter.convert();
    return DOMPurify.sanitize(raw);
  } catch (_e) {
    return "";
  }
}

export function isDeltaEmpty(delta: QuillDelta): boolean {
  if (!delta || !Array.isArray(delta.ops)) return true;

  return delta.ops.every((op) => {
    const insert = (op as { insert?: unknown }).insert;

    if (typeof insert === "string") {
      return insert.replace(/\s/g, "").length === 0;
    }

    if (insert && typeof insert === "object") {
      return false;
    }

    return true;
  });
}

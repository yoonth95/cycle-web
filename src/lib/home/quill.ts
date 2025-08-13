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

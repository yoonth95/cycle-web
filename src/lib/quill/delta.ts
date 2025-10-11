import { z } from "zod";

export const QuillDeltaOpSchema = z.record(z.string(), z.unknown());

export const QuillDeltaSchema = z.object({
  ops: z.array(QuillDeltaOpSchema),
});

export type QuillDeltaDocument = z.infer<typeof QuillDeltaSchema>;

export const createEmptyDelta = (): QuillDeltaDocument => ({
  ops: [],
});

export const cloneDelta = (delta: QuillDeltaDocument): QuillDeltaDocument => ({
  ops: delta.ops.map((op) => ({ ...op })),
});

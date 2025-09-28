import { z } from "zod";

export const PopupItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  link: z.string().nullable(),
});

export type PopupItem = z.infer<typeof PopupItemSchema>;

import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name requerido").transform(s => s.trim()),
    texto: z.string().min(1, "texto requerido").transform(s => s.trim()),
    role: z.string().trim().optional(),
  }),
});

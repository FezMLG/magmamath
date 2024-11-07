import { z } from "zod";

export const updateUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export type UpdateUserRequestDto = z.infer<typeof updateUserRequestSchema>;
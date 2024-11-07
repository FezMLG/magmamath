import { z } from "zod";

export const createUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
}).required();

export type CreateUserRequestDto = z.infer<typeof createUserRequestSchema>;
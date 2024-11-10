import { z } from "zod";
import { createZodDto } from 'nestjs-zod';

const updateUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export class UpdateUserRequestDto extends createZodDto(updateUserRequestSchema) {}
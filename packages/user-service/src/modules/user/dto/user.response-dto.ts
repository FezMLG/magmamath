import { z } from "zod";
import { createZodDto } from 'nestjs-zod';

const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
}).required();

export class UserResponseDto extends createZodDto(userResponseSchema) {}
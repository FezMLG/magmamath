import { z } from "zod";
import { createZodDto } from 'nestjs-zod';

const createUserRequestSchema = z.object({
  name: z.string().min(1).describe('The name of the user'),
  email: z.string().email().describe('The email of the user'),
}).required();

export class CreateUserRequestDto extends createZodDto(createUserRequestSchema) {}
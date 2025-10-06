import { config } from 'dotenv';
import { z } from 'zod';

config();

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  PORT: z.coerce.number().default(4000)
});

export const env = EnvSchema.parse(process.env);

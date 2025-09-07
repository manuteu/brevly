import { config } from 'dotenv';
import { z } from 'zod';

// Carrega as variáveis de ambiente do arquivo .env
config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.url().startsWith('postgres://'),
});

export const env = envSchema.parse(process.env);

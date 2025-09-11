import { z } from 'zod';

export const shortUrlSchema = z.object({
  originalUrl: z
    .url('URL deve ter um formato válido')
    .min(1, 'URL original é obrigatória'),
  shortCode: z
    .string()
    .min(1, 'Código encurtado é obrigatório')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Código deve conter apenas letras, números, hífens e underscores'
    )
    .max(20, 'Código deve ter no máximo 20 caracteres'),
});

export type ShortUrlFormData = z.infer<typeof shortUrlSchema>;

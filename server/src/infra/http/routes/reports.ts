import { FastifyPluginAsync } from 'fastify';
import { desc } from 'drizzle-orm';
import { db } from '../../db';
import { reportsSchema, shortUrlsSchema } from '../../db/schemas';
import { r2 } from '../../storage/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { env } from '../../../env';

function toCsvRow(values: string[]): string {
  const escaped = values.map((v) => {
    const hasQuote = v.includes('"');
    const hasComma = v.includes(',');
    const hasNewline = v.includes('\n') || v.includes('\r');
    let out = v.replace(/"/g, '""');
    if (hasQuote || hasComma || hasNewline) {
      out = `"${out}"`;
    }
    return out;
  });
  return escaped.join(',');
}

export const reportsRoutes: FastifyPluginAsync = async (server) => {
  server.post(
    '/reports/generate',
    {
      schema: {
        summary: 'Gerar relatório CSV com todas as URLs',
        tags: ['reports'],
        response: {
          201: {
            type: 'object',
            properties: {
              reportUrl: { type: 'string' },
              objectKey: { type: 'string' },
            },
          },
          500: {
            type: 'object',
            properties: { error: { type: 'string' } },
          },
        },
      },
    },
    async (_request, reply) => {
      try {
        const urls = await db.select().from(shortUrlsSchema);

        const header = ['URL original', 'URL encurtada', 'Contagem de acessos', 'Data de criação'];
        const rows = urls.map((u) =>
          toCsvRow([
            u.originalUrl,
            `https://brev.ly/${u.shortCode}`,
            String(u.clicks ?? 0),
            u.createdAt instanceof Date ? u.createdAt.toISOString() : String(u.createdAt),
          ])
        );
        const csv = [toCsvRow(header), ...rows].join('\n');

        const objectKey = `reports/${randomUUID()}.csv`;

        await r2.send(
          new PutObjectCommand({
            Bucket: env.CLOUDFLARE_BUCKET,
            Key: objectKey,
            Body: csv,
            ContentType: 'text/csv; charset=utf-8',
          })
        );

        const publicUrl = `${env.CLOUDFLARE_PUBLIC_URL.replace(/\/$/, '')}/${objectKey}`;

        const [inserted] = await db
          .insert(reportsSchema)
          .values({ publicUrl, objectKey })
          .returning();

        return reply.status(201).send({ reportUrl: inserted.publicUrl, objectKey: inserted.objectKey });
      } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
      }
    }
  );
}; 
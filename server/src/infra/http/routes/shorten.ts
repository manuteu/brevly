import { FastifyPluginAsync } from 'fastify';
import { db } from '../../db/index';
import { shortUrlsSchema } from '../../db/schemas/index';
import { eq } from 'drizzle-orm';

export const shortenUrl: FastifyPluginAsync = async (server) => {
  // Rota POST para criar URL encurtada
  server.post(
    '/shorten',
    {
      schema: {
        summary: 'Encurtar URL',
        tags: ['urls'],
        body: {
          type: 'object',
          required: ['originalUrl', 'shortCode'],
          properties: {
            originalUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL original para encurtar',
            },
            shortCode: {
              type: 'string',
              pattern: '^[a-zA-Z0-9_-]+$',
              description: 'Código personalizado para a URL encurtada',
            },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              shortUrl: { type: 'string' },
              originalUrl: { type: 'string' },
              shortCode: { type: 'string' },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          409: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortCode } = request.body as {
        originalUrl: string;
        shortCode: string;
      };
      console.log(request.body)
      try {
        // Verificar se o código já existe
        const existingUrl = await db
          .select()
          .from(shortUrlsSchema)
          .where(eq(shortUrlsSchema.shortCode, shortCode))
          .limit(1);

        if (existingUrl.length > 0) {
          return reply.status(409).send({
            error: 'Código já está em uso. Escolha outro código.',
          });
        }

        // Inserir nova URL encurtada
        const [newUrl] = await db
          .insert(shortUrlsSchema)
          .values({
            originalUrl,
            shortCode,
          })
          .returning();

        const shortUrl = `https://brev.ly/${shortCode}`;

        return reply.status(201).send({
          shortUrl,
          originalUrl: newUrl.originalUrl,
          shortCode: newUrl.shortCode,
        });
      } catch (error) {
        console.error('Erro ao encurtar URL:', error);
        return reply.status(500).send({
          error: 'Erro interno do servidor',
        });
      }
    }
  );

  // Rota GET para redirecionar URL encurtada
  server.get(
    '/:shortCode',
    {
      schema: {
        summary: 'Redirecionar URL encurtada',
        tags: ['urls'],
        params: {
          type: 'object',
          properties: {
            shortCode: { type: 'string' },
          },
        },
        response: {
          302: {
            description: 'Redirecionamento para URL original',
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { shortCode } = request.params as { shortCode: string };

      try {
        // Buscar URL pelo código
        const [url] = await db
          .select()
          .from(shortUrlsSchema)
          .where(eq(shortUrlsSchema.shortCode, shortCode))
          .limit(1);

        if (!url) {
          return reply.status(404).send({
            error: 'URL não encontrada',
          });
        }

        // Incrementar contador de cliques
        await db
          .update(shortUrlsSchema)
          .set({ clicks: url.clicks + 1 })
          .where(eq(shortUrlsSchema.id, url.id));

        // Redirecionar para URL original
        return reply.redirect(url.originalUrl, 302);
      } catch (error) {
        console.error('Erro ao redirecionar URL:', error);
        return reply.status(500).send({
          error: 'Erro interno do servidor',
        });
      }
    }
  );
};

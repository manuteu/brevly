import { FastifyPluginAsync } from 'fastify';
import { db } from '../../db/index';
import { shortUrlsSchema } from '../../db/schemas/index';
import { eq } from 'drizzle-orm';

export const shortenUrl: FastifyPluginAsync = async (server) => {
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

      try {
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

  server.get(
    '/shorten',
    {
      schema: {
        summary: 'Listar URLs encurtadas',
        tags: ['urls'],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                originalUrl: { type: 'string' },
                shortCode: { type: 'string' },
                clicks: { type: 'number' },
                createdAt: { type: 'string' },
                shortUrl: { type: 'string' },
              },
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
    async (_request, reply) => {
      try {
        const urls = await db.select().from(shortUrlsSchema);

        const withShortUrl = urls.map((u) => ({
          ...u,
          shortUrl: `https://brev.ly/${u.shortCode}`,
        }));

        return reply.status(200).send(withShortUrl);
      } catch (error) {
        console.error('Erro ao listar URLs encurtadas:', error);
        return reply.status(500).send({
          error: 'Erro interno do servidor',
        });
      }
    }
  );

  server.get(
    '/shorten/:shortCode',
    {
      schema: {
        summary: 'Obter URL original por código',
        tags: ['urls'],
        params: {
          type: 'object',
          properties: {
            shortCode: { type: 'string' },
          },
          required: ['shortCode'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              originalUrl: { type: 'string' },
              shortCode: { type: 'string' },
              clicks: { type: 'number' },
              createdAt: { type: 'string' },
              shortUrl: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: { error: { type: 'string' } },
          },
          500: {
            type: 'object',
            properties: { error: { type: 'string' } },
          },
        },
      },
    },
    async (request, reply) => {
      const { shortCode } = request.params as { shortCode: string };

      try {
        const [url] = await db
          .select()
          .from(shortUrlsSchema)
          .where(eq(shortUrlsSchema.shortCode, shortCode))
          .limit(1);

        if (!url) {
          return reply.status(404).send({ error: 'URL não encontrada' });
        }

        await db
          .update(shortUrlsSchema)
          .set({ clicks: url.clicks + 1 })
          .where(eq(shortUrlsSchema.id, url.id));

        const result = {
          ...url,
          shortUrl: `https://brev.ly/${url.shortCode}`,
        };

        return reply.status(200).send(result);
      } catch (error) {
        console.error('Erro ao buscar URL por código:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
      }
    }
  );

  server.delete(
    '/shorten/:shortCode',
    {
      schema: {
        summary: 'Deletar URL encurtada',
        tags: ['urls'],
        params: {
          type: 'object',
          properties: {
            shortCode: { type: 'string' },
          },
          required: ['shortCode'],
        },
        response: {
          204: {
            description: 'Item deletado com sucesso',
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
        const [existing] = await db
          .select()
          .from(shortUrlsSchema)
          .where(eq(shortUrlsSchema.shortCode, shortCode))
          .limit(1);

        if (!existing) {
          return reply.status(404).send({ error: 'URL não encontrada' });
        }

        await db
          .delete(shortUrlsSchema)
          .where(eq(shortUrlsSchema.id, existing.id));

        return reply.status(204).send();
      } catch (error) {
        console.error('Erro ao deletar URL:', error);
        return reply.status(500).send({
          error: 'Erro interno do servidor',
        });
      }
    }
  );
};

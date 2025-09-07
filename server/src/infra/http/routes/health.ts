import { FastifyPluginAsync } from "fastify"

export const healthCheck: FastifyPluginAsync = async server => {
  server.get(
    '/health',
    {
      schema: {
        summary: 'Health check',
        tags: ['health'],
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        },
      },
    },
    async (_, reply) => {
      return reply.status(200).send({ message: 'Health check successful' })
    }
  )
}

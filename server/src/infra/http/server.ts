import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { healthCheck } from './routes/health';
import { shortenUrl } from './routes/shorten';
import { env } from '../../env';
import { reportsRoutes } from './routes/reports';

const server = Fastify();

server.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

server.register(healthCheck);
server.register(shortenUrl);
server.register(reportsRoutes);

server
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    console.info(`Server Running! http://localhost:${env.PORT}`);
  })
  .catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });

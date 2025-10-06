import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwtPlugin from './plugins/jwt';
import prismaPlugin from './plugins/prisma';
import { env } from './env';

const fastify = Fastify({ logger: true });

async function buildServer() {
  await fastify.register(cors, { origin: true });
  await fastify.register(jwtPlugin);
  await fastify.register(prismaPlugin);

  // Health
  fastify.get('/health', async () => ({ status: 'ok' }));

  // Disclaimer
  fastify.get('/disclaimer', async () => ({
    connectorOnly: true,
    message:
      'This platform is a connector between companies and manpower vendors. No guarantees, warranties, liabilities, payments, or services obligations are assumed by the platform.'
  }));

  return fastify;
}

buildServer()
  .then((app) => app.listen({ port: env.PORT, host: '0.0.0.0' }))
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });

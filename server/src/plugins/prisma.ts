import { PrismaClient } from '../../generated/prisma';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaClient = new PrismaClient();

export default fp(async (fastify) => {
  fastify.decorate('prisma', prismaClient);
  fastify.addHook('onClose', async () => {
    await prismaClient.$disconnect();
  });
});

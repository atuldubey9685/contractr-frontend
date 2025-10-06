import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { env } from '../env';

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: { id: string; role: 'VENDOR' | 'COMPANY' };
  }
}

export default fp(async (fastify) => {
  await fastify.register(fastifyJwt, { secret: env.JWT_SECRET });

  fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
      request.authUser = { id: request.user.id, role: request.user.role };
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
});

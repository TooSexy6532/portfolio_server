import fstifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';

async function auth (fastify, opts) {
  await fastify.register(fstifyCookie);

  await fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: fastify.config.SALT,
    cookie: { secure: false },
    maxAge: 3600 * 8,
  });

  // Декоратор для проверки авторизации в маршрутах.
  await fastify.decorate("checkAuth", async function (request, reply) {
    if (request.session.isAuth !== true) {
      reply.send({ message: "Нужна авторизация" }).code(403);
    }
  });
}

export default fp(auth, {
  name: 'auth'
});
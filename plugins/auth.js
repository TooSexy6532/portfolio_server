import fstifyCookie from "@fastify/cookie"
import fastifySession from "@fastify/session"
import store from "connect-mongo"
import fp from "fastify-plugin"

const MongoStore = new store({ mongoUrl: process.env.CONNECT_DB })

async function auth(fastify, opts) {
  await fastify.register(fstifyCookie)

  await fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: fastify.config.SALT,
    cookie: { secure: false },
    maxAge: 3600 * 8,
    store: MongoStore,
  })

  // Декоратор для проверки авторизации в маршрутах.
  await fastify.decorate("checkAuth", async function (request, reply) {
    if (process.env === "production") {
      if (request.session.isAuth !== true) {
        reply.code(403).send({ message: "Нужна авторизация" })
      }
    }
  })
}

export default fp(auth, {
  name: "auth",
})

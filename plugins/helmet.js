import fastifyHelmet from "@fastify/helmet"
import fp from "fastify-plugin"

async function helmet(fastify, opts) {
  fastify.register(fastifyHelmet)
}

export default fp(helmet, {
  name: "fastifyCors",
})

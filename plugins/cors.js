import fastifyCors from "@fastify/cors"
import fp from "fastify-plugin"

async function cors(fastify, opts) {
  fastify.register(fastifyCors)
}

export default fp(cors, {
  name: "fastifyCors",
})

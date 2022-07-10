import fastifyStatic from "@fastify/static"
import fp from "fastify-plugin"
import path from "path"

async function iniStatic(fastify, opts) {
  const __dirname = path.resolve(path.dirname(""))
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/api'
  })
}

export default fp(iniStatic, {
  name: "fastifyStatic",
})

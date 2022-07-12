import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

async function cors(fastify, opts) {
 
  fastify.register(fastifyCors, (instance) => {
    return (req, callback) => {
      const corsOptions = {
        origin: true
      };
      callback(null, corsOptions)
    }
  })
}

export default fp(cors, {
  name: "fastifyCors",
})

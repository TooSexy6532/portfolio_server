import User from "../models/user.js";

async function routes(fastify, options) {
  fastify.get("/users", async (req, reply, next) => {
    try {
      const users = await User.find({});

      reply.send({ users });
    } catch (error) {
      reply.send({ error });
    }
  });
}

export default routes;

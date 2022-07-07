import User from "../models/user.js"

async function routes(fastify, options) {
  fastify.get("/users", async (req, reply, next) => {
    const { email, _id } = req.params

    const query = {}

    if (email) query.email = email
    if (_id) query._id = _id

    try {
      const users = await User.find(query)

      return reply.send({ users })
    } catch (error) {
      return reply.send({ error })
    }
  })
}

export default routes

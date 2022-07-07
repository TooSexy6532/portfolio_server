import User from "../models/user.js"

const UserController = {
  getUsers: async function (request, reply) {
    try {
      const users = await User.find({})
      return reply.send(users)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUser: async function (request, reply) {
    const { email, _id } = req.params

    const query = {}

    if (email) query.email = email
    if (_id) query._id = _id

    try {
      const users = await User.find(query)
      return reply.send({ users })
    } catch (error) {
      throw new Error(error.message)
    }
  },

  createUser: async function (request, reply) {
    try {
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateUser: async function (request, reply) {
    try {
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deletetUser: async function (request, reply) {
    try {
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export default UserController

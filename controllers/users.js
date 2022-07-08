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
    const { _id } = request.params

    const query = {}

    if (_id) query._id = _id

    try {
      const user = await User.findOne(query)
      return reply.send(user)
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
    const { _id } = request.body

    if (!_id)
      throw new Error("Для удаления пользователя необходимо указать _id")

    try {
      await User.deleteOne({ _id })

      return reply.send({ message: "Пользователь успешно удален" })
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export default UserController

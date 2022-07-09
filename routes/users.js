import UserController from "../controllers/users.js"

async function routes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const User = {
    type: "object",
    properties: {
      _id: { type: "string" },
      email: { type: "string" },
      firstname: { type: "string" },
      role: { type: "string" },
    },
  }

  const getUsersOpts = {
    handler: UserController.getUsers,
    schema: {
      response: {
        200: {
          type: "array",
          items: User,
        },
      },
    },
  }

  fastify.get("/users", getUsersOpts)

  const getUserOpts = {
    handler: UserController.getUser,
    schema: {
      params: {
        type: "object",
        properties: { _id: { type: "string" } },
      },
      response: {
        200: User,
      },
    },
  }

  fastify.get("/user", getUserOpts)

  const createUserOpts = {
    handler: UserController.createUser,
    schema: {
      response: {
        200: User,
      },
    },
  }

  fastify.post("/user", createUserOpts)

  const updateUserOpts = {
    handler: UserController.updateUser,
  }

  fastify.put("/user", updateUserOpts)

  const deleteUserOpts = {
    handler: UserController.deletetUser,
  }

  fastify.delete("/user", deleteUserOpts)
}

export default routes

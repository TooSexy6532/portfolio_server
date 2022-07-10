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
    preValidation: [fastify.checkAuth],
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
    preValidation: [fastify.checkAuth],
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
    preValidation: [fastify.checkAuth],
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        firstname: { type: "string" },
        role: { type: "string" },
        password: { type: "string" },
      },
    },
    schema: {
      response: {
        200: User,
      },
    },
  }

  fastify.post("/user", createUserOpts)

  const updateUserOpts = {
    handler: UserController.updateUser,
    preValidation: [fastify.checkAuth],
    schema: {
      body: User,
      response: {
        200: Message,
      },
    },
  }

  fastify.put("/user", updateUserOpts)

  const deleteUserOpts = {
    handler: UserController.deletetUser,
    preValidation: [fastify.checkAuth],
    schema: {
      body: { type: "object", properties: { _id: { type: "string" } } },
      response: {
        200: Message,
      },
    },
  }

  fastify.delete("/user", deleteUserOpts)
}

export default routes

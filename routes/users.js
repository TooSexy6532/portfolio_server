import UserController from "../controllers/users.js"

async function routes(fastify, options) {
  const User = {
    type: "object",
    properties: {
      email: { type: "string" },
      _id: { type: "string" },
      firstname: { type: "string" },
      secondname: { type: "string" },
      role: { type: "string" },
      isActivated: { type: "string" },
    },
  }

  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const getUsersOpts = {
    handler: UserController.getUsers,
    schema: {
      response: {
        200: {
          type: "array",
          users: User,
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
        required: ["_id"],
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
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          role: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: Message,
      },
    },
  }

  fastify.post("/user", createUserOpts)

  const updateUserOpts = {
    handler: UserController.updateUser,
    schema: {
      body:  User ,
      response: {
        200: User,
      },
    },
  }

  fastify.put("/user", updateUserOpts)

  const deleteUserOpts = {
    handler: UserController.deletetUser,
    schema: {
      body: {
        type: "object",
        required: ["_id"],
        properties: { _id: { type: "string" } },
      },
      response: {
        200: Message,
      },
    },
  }

  fastify.delete("/user", deleteUserOpts)
}

export default routes

import AuthController from "../controllers/auth.js";

const User = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
};

const loginOptions = {
  schema: {
    body: { type: "object", required: ["user"], properties: { user: User } },
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: AuthController.login,
};

const logoutOptions = {
  schema: {
    response: {
      200: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: AuthController.logout,
};

const checkMeOptions = {
  handler: AuthController.checkMe,
};

async function authRoutes(fastify, options) {
  fastify.post("/login", loginOptions);

  fastify.post("/logout", logoutOptions);

  fastify.get("/me", checkMeOptions);
}

export default authRoutes;

import PreferencesController from "../controllers/preferences.js"

async function routes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const Preferences = {
    type: "object",
    properties: {
      _id: { type: "string" },
      mainImage: { type: "string" },
      aboutImage: { type: "string" },
      aboutContent: { type: "string" },
      description: { type: "string" },
    },
  }

  const getPreferencesOpts = {
    handler: PreferencesController.getPreferences,
    schema: {
      response: {
        200: { type: "object", properties: { preferences: Preferences } },
      },
    },
  }

  const updatePreferencesOpts = {
    handler: PreferencesController.updatePreferences,
    preValidation: [fastify.checkAuth],
    schema: {
      body: Preferences,
      response: {
        200: Message,
      },
    },
  }

  fastify.get("/preferences", getPreferencesOpts)

  fastify.put("/preferences", updatePreferencesOpts)
}

export default routes

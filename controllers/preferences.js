import Preferences from "../models/preferences.js"

const PreferencesController = {
  getPreferences: async function (request, reply) {
    try {
      let preferences = await Preferences.findOne({})

      if (!preferences) {
        console.log(1)
        preferences = await Preferences.create({
          mainImage: "",
          aboutImage: "",
          aboutContent: "",
          description: "",
        })
      }

      return reply.send({ preferences })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  updatePreferences: async function (request, reply) {
    const { _id, ...obj } = request.body

    try {
      await Preferences.updateOne({ _id }, obj)
      return reply.send({ message: "Настройки обновлены" })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },
}

export default PreferencesController

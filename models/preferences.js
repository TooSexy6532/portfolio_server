import mongoose from "mongoose"

const { model, Schema } = mongoose

const schema = new Schema({
  mainImage: { type: String },

  aboutImage: { type: String },

  aboutContent: { type: String },

  description: { type: String },
})
const Preferences = model("Preferences", schema)
export default Preferences

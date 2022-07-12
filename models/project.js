import mongoose from "mongoose"

const { model, Schema } = mongoose

const schema = new Schema({
  title: { type: String, unique: true, required: true },

  previewImage: { type: String },

  heroImage: { type: String },

  alias: { type: String, unique: true, required: true },

  description: { type: String },

  content: { type: String },

  showOnMainPage: { type: String },

  category: { type: mongoose.Schema.ObjectId, ref: "Category" },
})
const Project = model("Project", schema)
export default Project

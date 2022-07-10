import mongoose from "mongoose"

const { model, Schema } = mongoose

const schema = new Schema({
  title: { type: String, unique: true, required: true },

  alias: { type: String, unique: true, required: true },

  description: { type: String },

  content: { type: String },
})
const Project = model("Project", schema)
export default Project

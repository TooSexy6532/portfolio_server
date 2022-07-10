import mongoose from "mongoose"

const { model, Schema } = mongoose

const schema = new Schema({
  name: { type: String, unique: true, required: true },

  description: { type: String },
})
const Project = model("Project", schema)
export default Project

import bcrypt from "bcrypt"
import mongoose from "mongoose"

const { model, Schema } = mongoose

const schema = new Schema({
  email: { type: String, unique: true, required: true },

  role: { type: String, required: true },

  password: { type: String, required: true },

  isActivated: { type: Boolean, default: false },

  activationLink: { type: String },

  firstname: { type: String },
})

const User = model("User", schema)

const init = async () => {
  const user = await User.findOne({})

  if (!user) {
    const hashedPassword = await bcrypt.hash("1", 3)

    const newUser = new User({
      email: "papkovdmitry@gmail.com",
      role: "Administrator",
      password: hashedPassword,
      isActivated: true,
    })

    await newUser.save()
  }
}

init()

export default User

import mongoose from "mongoose";

const { model, Schema } = mongoose;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  password: { type: String, unique: true, required: true },
  isActivated: { type: Boolean, default: false },
});

const User = model("User", schema);

export default User;

(async () => {
  const user = await User.findOne({});

  if (!user) {
    const newUser = new User({
      email: "papkovdmitry@gmail.com",
      role: "Administrator",
      password: "1",
      isActivated: true,
    });

    await newUser.save();
  }
})();

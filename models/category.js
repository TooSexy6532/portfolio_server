const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  idx: {
    type: Number,
  }
});

const Category = (exports.Category = mongoose.model("Category", schema));

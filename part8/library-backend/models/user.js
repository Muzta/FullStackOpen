const mongoose = require("mongoose");

// you must install this library
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);

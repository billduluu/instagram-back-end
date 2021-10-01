const mongoose = require("mongoose");
const validator = require("validator");
const { isEmail } = validator;
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  password: { type: String, required: true },
  hash: { type: String },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

userSchema.pre("save", async function (next) {
  const rounds = 10; // What you want number for round paasword

  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;
  next();
});
module.exports = mongoose.model("users", userSchema);

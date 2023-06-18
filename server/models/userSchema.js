import mongoose from "mongoose";

import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: String,

  userId: { type: String, required: true, unique: true }, // unique
  password: {
    type: String,
    required: true,
  }, // hashed
  isAdmin: Boolean,
  questionsSolved: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

User.pre("save", function (next) {
  //
});

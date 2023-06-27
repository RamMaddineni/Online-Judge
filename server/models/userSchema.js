import mongoose from "mongoose";

// import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: String,

  name: { type: String, required: true }, // unique
  password: {
    type: String,
    required: true,
  }, // hashed
  email: {
    type: String,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
  questionsSolved: {
    type: Number,
    default: 0,
  },
  isGoogle: {
    type: Boolean,
  },
  tokenId: String,
});

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

// import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: String,

  userId: { type: String, required: true, unique: true }, // unique
  password: {
    type: String,
    required: true,
  }, // hashed
  email: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
  questionsSolved: {
    type: Number,
    default: 0,
  },
  isGoogle: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

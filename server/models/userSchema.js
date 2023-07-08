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
  submittedProblems: {
    type: [mongoose.Schema.Types.Mixed],
    //  submittedCodeId :
    //  language  :
    //  solved   :  true or false.
    //  problemId : _id of problem
  },
  attemptedProblems: {
    type: Number,
    default: 0,
  },
  solvedProblems: {
    type: Number,
    default: 0,
  },
  hardCount: {
    type: Number,
    default: 0,
  },

  easyCount: {
    type: Number,
    default: 0,
  },
  mediumCount: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

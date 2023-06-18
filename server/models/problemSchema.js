import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String, // unique
  description: String,

  constraints: String,

  sampleInput: String,
  sampleOutput: String,
  explanation: String,
  difficulty: String,
  tags: [String],
  testcases: [String],
  answers: [String],

  createdAt: Date,
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;

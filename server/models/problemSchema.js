import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: String,
  description: String,

  constraints: String,

  sampleInput: String,
  sampleOutput: String,
  explanation: String,
  difficulty: String,

  testcases: [String],
  answers: [String],
  createdAt: Date,
});

const Problems = mongoose.model("Problems", problemSchema);
problemSchema.pre("save", function (next) {
  this.createdAt = Date.now();
  next();
});
export default Problems;

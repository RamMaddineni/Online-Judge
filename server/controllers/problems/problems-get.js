import Problems from "../../models/problemSchema.js";

const getProblems = async (req, res) => {
  try {
    const problems = await Problems.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export default getProblems;

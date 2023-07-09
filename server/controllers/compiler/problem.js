import Problems from "../../models/problemSchema.js";
import User from "../../models/userSchema.js";
import generateFile from "../../utils/generateFile.js";
import codeRunner from "../../utils/codeRunner.js";

import path from "path";

const updateDatabase = async (info, filePath, email, id) => {
  try {
    const extension = path.extname(filePath);
    const fileName = path.basename(filePath, extension);
    const user = await User.findOne({ email });
    const isPresent = user.submittedProblems.some(
      (obj) => obj.problemId === id
    );
    const isSolved = user.submittedProblems.some(
      (obj) => obj.problemId === id && obj.solved === true
    );
    if (info.verdict) {
      //  submittedCodeId :
      //  language  :
      //  solved   :  true or false.
      //  problemId : _id of problem
      user.submittedProblems.push({
        submittedCodeId: fileName,
        language: extension.split(".")[1],
        solved: true,
        problemId: id,
      });
      if (!isSolved) user.solvedProblems += 1;
      const problem = await Problems.findById(id);
      if (problem.difficulty === "easy" && !isSolved) {
        user.easyCount += 1;
      }
      if (problem.difficulty === "medium" && !isSolved) {
        user.mediumCount += 1;
      }
      if (problem.difficulty === "hard" && !isSolved) {
        user.hardCount += 1;
      }
      if (!isPresent) user.attemptedProblems += 1;
      await user.save();
    } else if (!info.verdict) {
      user.submittedProblems.push({
        submittedCodeId: fileName,
        language: extension.split(".")[1],
        solved: false,
        problemId: id,
      });
      if (!isPresent) user.attemptedProblems += 1;
      await user.save();
    }
  } catch (err) {
    console.log(err.message, "error in updating database in problem.js");
  }
};

const problemCompiler = async (req, res) => {
  let filePath;
  const { id } = req.params;
  try {
    const { code, lang } = req.body;
    filePath = await generateFile(code, lang);
    const problem = await Problems.findById(id);
    const info = await codeRunner(filePath, problem.testcases, problem.answers);
    updateDatabase(info, filePath, req.email, id);
    res.json({ info: info });
  } catch (err) {
    console.log(err.message, "error in problem.js");
    if (err.info) {
      updateDatabase(err.info, filePath, req.email, id);
    }
    console.log(err.info || err.message, " error in problem.js");
    res.status(500).json({ error: err.message, info: err.info });
  }
};

export default problemCompiler;

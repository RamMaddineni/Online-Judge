import generateFile from "../../utils/generateFile.js";
import executeCode from "../../utils/excecuteCode.js";
const compiler = async (req, res) => {
  const code = req.body.code;
  const lang = req.body.language;
  const input = req.body.input;
  const filePath = await generateFile(code, lang);
  console.log("compiler", filePath);
  try {
    const output = await executeCode(filePath, input);
    res.json({ output });
  } catch (err) {
    res.json({ output: err });
  }
  return;
};

export default compiler;

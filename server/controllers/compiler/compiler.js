import generateFile from "../../utils/generateFile.js";
import executeCode from "../../utils/excecuteCode.js";
const compiler = async (req, res) => {
  const code = req.body.code;
  const lang = req.body.language;
  console.log("lang", lang);
  const filePath = await generateFile(code, lang);
  console.log(filePath);
  try {
    const output = await executeCode(filePath);
    res.json({ output });
  } catch (err) {
    res.json({ output: err });
  }
  return;
};

export default compiler;

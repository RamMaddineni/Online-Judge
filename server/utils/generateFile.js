import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../codes");

if (!fs.existsSync(dir)) {
  // console.log("Directory not exists");
  fs.mkdirSync(dir, { recursive: true });
}

const generateFile = async (code, language) => {
  const codeDir = path.join(dir, language);
  if (!fs.existsSync(codeDir)) {
    fs.mkdirSync(codeDir, { recursive: true });
  }
  let codeId = uuidv4().replace(/-/g, ""); // remove all dashes from uuid;
  let modifiedCode = code;
  if (language === "java") {
    codeId = "MyClass_" + codeId;
    const classNameRegex = /public\s+class\s+(\w+)\s*\{/;
    modifiedCode = code.replace(classNameRegex, `public class ${codeId} {`);
  }
  const fileName = `${codeId}.${language}`;
  const filePath = path.join(codeDir, fileName);
  await fs.writeFileSync(filePath, modifiedCode);
  return filePath;
};

export default generateFile;

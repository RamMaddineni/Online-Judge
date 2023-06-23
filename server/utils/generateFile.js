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
  const codeId = uuidv4();
  const fileName = `${codeId}.${language}`;
  const filePath = path.join(dir, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};

export default generateFile;

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputPath = path.join(__dirname, "../output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCode = async (filePath) => {
  const extension = path.extname(filePath);
  const fileName = path.basename(filePath, extension);
  const outputFilePath = path.join(outputPath, `${fileName}.exe`);

  await fs.writeFileSync(outputFilePath, "");
  const command = {
    c: `gcc ${filePath} -o ${outputFilePath} &&  ${outputFilePath}`,
    cpp: `g++ ${filePath} -o ${outputFilePath} && ${outputFilePath}`,
  };
  console.log(extension.split(".")[1]);
  console.log(command[extension.split(".")[1]], "executeCode");
  return new Promise((resolve, reject) => {
    exec(command[extension.split(".")[1]], (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

export default executeCode;

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputPath = path.join(__dirname, "../output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCode = async (filePath, input) => {
  console.log("executeCode", filePath, input);
  const extension = path.extname(filePath);
  const fileName = path.basename(filePath, extension);
  const outputFileDir = path.join(outputPath, extension.split(".")[1]);
  if (!fs.existsSync(outputFileDir)) {
    fs.mkdirSync(outputFileDir, { recursive: true });
  }
  let outputFilePath;
  if (extension.split(".")[1] === "cpp" || extension.split(".")[1] === "c")
    outputFilePath = path.join(outputFileDir, `${fileName}.exe`);

  const command = {
    c: [
      "/s",
      "/c",
      "gcc",
      `${filePath}`,
      "-o",
      `${outputFilePath}`,
      "&&",
      "cd",
      `${outputFileDir}`,
      "&&",
      `.\\${fileName}.exe`,
    ],
    cpp: [
      "/s",
      "/c",
      "g++",
      `${filePath}`,
      "-o",
      `${outputFilePath}`,
      "&&",
      "cd",
      `${outputFileDir}`,
      "&&",
      `.\\${fileName}.exe`,
    ],
    java: [
      "/s",
      "/c",
      "javac",
      "-d",
      outputFileDir,
      filePath,
      "&&",
      "cd",
      outputFileDir,
      "&&",
      "java",
      fileName,
    ],
    js: ["/s", "/c", "node", filePath],
    py: ["/s", "/c", "python", filePath],
  };
  const dockerCommand = {
    c: [
      "-c",
      `gcc ${filePath} -o ${outputFilePath} && cd ${outputFileDir} && ./${fileName}.exe`,
    ],
    cpp: [
      "-c",
      `g++ ${filePath} -o ${outputFilePath} && cd ${outputFileDir} && ./${fileName}.exe`,
    ],
    java: [
      "-c",
      `javac -d ${outputFileDir} ${filePath} && cd ${outputFileDir} && java ${fileName}`,
    ],
    js: ["-c", `node ${filePath}`],
    py: ["-c", `python ${filePath}`],
  };

  console.log(extension.split(".")[1]);
  console.log(command[extension.split(".")[1]], "executeCode");
  console.log(dockerCommand[extension.split(".")[1]], "executeCode");
  return new Promise((resolve, reject) => {
    const process = spawn("cmd", command[extension.split(".")[1]]);
    let output = "";
    process.stdin.write(input);
    process.stdin.end();
    process.stdout.on("data", (data) => {
      output += data.toString();
    });
    process.stderr.on("data", (data) => {
      output += data.toString();
    });
    process.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        console.log(output, typeof output);
        reject(
          `program ended with exit code ${code}, ${output.error || output}`
        );
      }
    });
  });
};

export default executeCode;

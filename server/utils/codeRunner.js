import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputPath = path.join(__dirname, "../output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const smoothString = (str) => {
  // define a regular expression to match newline characters or more than one consecutive space
  const regex = /(\n|\s{2,})/g;

  // replace any matches of the regular expression with a single space
  const smoothedStr = str.replace(regex, " ").trim();

  return smoothedStr;
};

const codeRunner = async (filePath, input, expectedOutput) => {
  try {
    // console.log("executeCode", filePath, input);
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
      c: {
        pre: `gcc ${filePath} -o ${outputFilePath} `,
        post: `cd ${outputFileDir} && ./${fileName}.exe`,
      },
      cpp: {
        pre: ` g++ ${filePath} -o ${outputFilePath} `,
        post: `cd ${outputFileDir} && ./${fileName}.exe`,
      },
      java: {
        pre: `javac -d ${outputFileDir} ${filePath} `,
        post: `cd ${outputFileDir} && java ${fileName}`,
      },
      js: {
        pre: ``,
        post: `node ${filePath} `,
      },
      py: {
        pre: ``,
        post: `python ${filePath} `,
      },
    };

    const lang = extension.split(".")[1];

    // const input = [`1 2 \n`, `2 3\n`, `91 9\n`]; // get from database
    // const expectedOutput = [`3    \n`, `5\n`, `100\n`]; // get from database

    let info = {
      verdict: true,
      success: true,
      message: "All testcases passed",
    };
    let t = input.length;
    let i = 0;
    command[lang].pre && execSync(command[lang].pre);
    while (t--) {
      const output = execSync(command[lang].post, {
        input: input[i],
      }).toString();
      if (smoothString(output) !== smoothString(expectedOutput[i])) {
        info = {
          input: input[i],
          output: output,
          expectedOutput: expectedOutput[i],
          testcase: i + 1,
          verdict: false,
          message: "testcase failed",
          success: false,
        };

        return info;
      }
      i++;
    }
    return info;
  } catch (err) {
    let info;
    info = {
      success: false,
      verdict: false,
      message: err.message,
    };
    err.info = info;
    return info;
  }
};

export default codeRunner;

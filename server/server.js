import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import Problems from "./models/problemSchema.js";
const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:3000",
  })
);
app.use(express.json());

DBConnection();
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use("/", router);
const problems = [
  // {
  //   id: "1",
  //   title: "Sum of two numbers",
  //   description: "Given two numbers, find their sum",
  //   constraints: "1 <= a, b <= 10^9",
  //   sampleInput: ["1 2", "2 4", "3 7 "],
  //   sampleOutput: ["3", "6", "10"],
  //   explanation:
  //     "testcase 1 : 1 + 2 = 3 \n testcase 2: 2+4 =6 \n  testcase 3: 10",
  //   difficulty: "easy",
  //   testcases: ["1 2", "3 4", "5 6"],
  //   answers: ["3", "7", "11"],
  // },
  {
    id: "2",
    title: "Product of two numbers",
    description: "Given two numbers, find their product",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["2 3", "4 5", "6 7"],
    sampleOutput: ["6", "20", "42"],
    explanation:
      "testcase 1 : 2 * 3 = 6 \n testcase 2: 4 * 5 = 20 \n  testcase 3: 6 * 7 = 42",
    difficulty: "easy",
    testcases: ["2 3", "4 5", "6 7"],
    answers: ["6", "20", "42"],
  },
  {
    id: "3",
    title: "Find the maximum of two numbers",
    description: "Given two numbers, find the maximum of the two",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["2 3", "4 5", "6 7"],
    sampleOutput: ["3", "5", "7"],
    explanation:
      "testcase 1 : max(2, 3) = 3 \n testcase 2: max(4, 5) = 5 \n  testcase 3: max(6, 7) = 7",
    difficulty: "easy",
    testcases: ["2 3", "4 5", "6 7"],
    answers: ["3", "5", "7"],
  },
  {
    id: "4",
    title: "Find the minimum of two numbers",
    description: "Given two numbers, find the minimum of the two",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["2 3", "4 5", "6 7"],
    sampleOutput: ["2", "4", "6"],
    explanation:
      "testcase 1 : min(2, 3) = 2 \n testcase 2: min(4, 5) = 4 \n  testcase 3: min(6, 7) = 6",
    difficulty: "easy",
    testcases: ["2 3", "4 5", "6 7"],
    answers: ["2", "4", "6"],
  },
  {
    id: "5",
    title: "Find the difference of two numbers",
    description: "Given two numbers, find the difference between them",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["2 3", "4 5", "6 7"],
    sampleOutput: ["-1", "-1", "-1"],
    explanation:
      "testcase 1 : diff(2, 3) = -1 \n testcase 2: diff(4, 5) = -1 \n  testcase 3: diff(6, 7) = -1",
    difficulty: "easy",
    testcases: ["2 3", "4 5", "6 7"],
    answers: ["-1", "-1", "-1"],
  },
  {
    id: "6",
    title: "Find the average of two numbers",
    description: "Given two numbers, find their average",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["2 3", "4 5", "6 7"],
    sampleOutput: ["2.5", "4.5", "6.5"],
    explanation:
      "testcase 1 : avg(2, 3) = 2.5 \n testcase 2: avg(4, 5) = 4.5 \n  testcase 3: avg(6, 7) = 6.5",
    difficulty: "easy",
    testcases: ["2 3", "4 5", "6 7"],
    answers: ["2.5", "4.5", "6.5"],
  },
  {
    id: "7",
    title: "Longest increasing subsequence",
    description:
      "Given an array of integers, find the length of the longest increasing subsequence",
    constraints: "1 <= n <= 10^3, 1 <= arr[i] <= 10^9",
    sampleInput: "6\n3 4 2 8 10 5",
    sampleOutput: ["4"],
    explanation:
      "The longest increasing subsequence is [3, 4, 8, 10], which has length 4",
    difficulty: "hard",
    testcases: [
      "6\n3 4 2 8 10 5",
      "7\n1 2 3 4 5 6 7",
      "5\n5 4 3 2 1",
      "10\n1 2 3 4 5 6 7 8 9 10",
      "8\n1 2 3 2 4 5 6 7",
    ],
    answers: ["4", "7", "1", "10", "6"],
  },
];
const insertProblems = async () => {
  await Problems.insertMany(problems);
};
const deleteProblems = async () => {
  await Problems.deleteMany({});
};
// deleteProblems();
// insertProblems();
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

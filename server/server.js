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
  {
    id: "1",
    title: "Sum of two numbers",
    description: "Given two numbers, find their sum",
    constraints: "1 <= a, b <= 10^9",
    sampleInput: ["1 2", "2 4", "3 7 "],
    sampleOutput: ["3", "6", "10"],
    explanation:
      "testcase 1 : 1 + 2 = 3 \n testcase 2: 2+4 =6 \n  testcase 3: 10",
    difficulty: "easy",
    testcases: ["1 2", "3 4", "5 6"],
    answers: ["3", "7", "11"],
  },
  // {
  //   id: "2",
  //   title: "Find the shortest path",
  //   description:
  //     "Given a graph and two nodes, find the shortest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 3 4 5",
  //   explanation: "The shortest path between nodes 1 and 5 is 1 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 3 4 5", "1 2 4 5 6", "1 3 4 5 6 7"],
  // },
  // {
  //   id: "3",
  //   title: "Find the longest path",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "4",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "5",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "6",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "7",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "8",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "9",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "10",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "11",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "12",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
  // {
  //   id: "13",
  //   title:
  //     "Find the longest path lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!  lorem",
  //   description:
  //     "Given a graph and two nodes, find the longest path between them",
  //   constraints: "1 <= n <= 10^5, 1 <= m <= 10^6",
  //   sampleInput: "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //   sampleOutput: "1 2 3 4 5",
  //   explanation:
  //     "The longest path between nodes 1 and 5 is 1 -> 2 -> 3 -> 4 -> 5",
  //   difficulty: "Hard",
  //   testcases: [
  //     "5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1 5",
  //     "6 8\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n1 6",
  //     "7 9\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n5 6\n6 7\n1 7",
  //   ],
  //   answers: ["1 2 3 4 5", "1 2 4 5 6", "1 2 3 4 5 6 7"],
  // },
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

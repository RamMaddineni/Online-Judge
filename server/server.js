import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import {
  insertProblems,
  deleteProblems,
} from "./createProblems/createProblems.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Serve the React app's index.html for all routes except /api
// app.get(/^((?!\/api).)*$/, function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

DBConnection();

app.use("/api", router);

// insertProblems();
// deleteProblems();
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import Problems from "./models/problemSchema.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );
app.use(express.json());

DBConnection();

app.use("/", router);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

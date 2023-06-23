import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

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
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

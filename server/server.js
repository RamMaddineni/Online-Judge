import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";

const app = express();

app.use(cors());
app.use(express.json());

DBConnection();
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

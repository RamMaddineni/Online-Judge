import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import router from "./routes/routes.js";
const app = express();

app.use(cors());
app.use(express.json());

DBConnection();
app.use("/", router);
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

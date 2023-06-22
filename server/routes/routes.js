import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import register from "../controllers/auth/register.js";
// Routes
// user should be login to access these routes.
// i will handle login later.

router.get("/", async (req, res) => {
  console.log("Home Route");

  res.send("Home Route");
});

//auth routes
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/login", (req, res) => {
  console.log("Login Route");
  res.send({ success: true, message: "User Logged in Successfully" });
});

// 1 HLD
router.get("/api/v1/problems", (req, res) => {
  console.log("All Problems Route");
  res.send("All Problems Route");
});

//  2 HLD
router.get("/api/v1/problem/:id", (req, res) => {
  // id is doc id in mongodb
  console.log("Problem Route");
  res.send("Particular Problem Route");
});

router.post("/api/v1/answer/:id", (req, res) => {
  // id is the doc id of the problem in mongodb
  console.log("Answer Route");

  res.send("Answer - compilation and Verdict Route");
  // return verdict
});

// below are admin routes

router.post("/api/v1/problem", (req, res) => {
  // to post a problem to the database user should be admin .
  console.log("Problem Route");
  res.send("Problem Route for admin to post a problem");
});

router.put("/api/v1/problem/:id", (req, res) => {
  // to update a problem in the database user should be admin .
  console.log("Problem Route");
  res.send("Problem Route for admin to update a existing  problem");
});

export default router;

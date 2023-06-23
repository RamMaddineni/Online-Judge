import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import register from "../controllers/auth/register.js";
import localLogin from "../controllers/auth/localLogin.js";
import validateJwt from "../middlware/validateJwt.js";
import profile from "../controllers/Profile/profile.js";
import googleLogin from "../controllers/auth/googleLogin.js";
import compiler from "../controllers/compiler/compiler.js";
// Routes
// user should be login to access these routes.
// i will handle login later.

router.get("/", async (req, res) => {
  console.log("Home Route");

  res.send("Home Route");
});

//auth routes
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/local/login", localLogin);
router.post("/api/v1/auth/google/login", googleLogin);

router.post("/api/v1/profile", validateJwt, profile);
router.get("/api/v1/logout", (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
});
router.post("/api/v1/compiler", validateJwt, compiler);

// 1 HLD
router.get("/api/v1/problems", validateJwt, (req, res) => {
  console.log("All Problems Route");
  res.send("All Problems Route");
});

//  2 HLD
router.get("/api/v1/problem/:id", validateJwt, (req, res) => {
  // id is doc id in mongodb
  console.log("Problem Route");
  res.send("Particular Problem Route");
});

router.post("/api/v1/answer/:id", validateJwt, (req, res) => {
  // id is the doc id of the problem in mongodb
  console.log("Answer Route");

  res.send("Answer - compilation and Verdict Route");
  // return verdict
});

// below are admin routes

router.post("/api/v1/problem", validateJwt, (req, res) => {
  // to post a problem to the database user should be admin .
  console.log("Problem Route");
  res.send("Problem Route for admin to post a problem");
});

router.put("/api/v1/problem/:id", validateJwt, (req, res) => {
  // to update a problem in the database user should be admin .
  console.log("Problem Route");
  res.send("Problem Route for admin to update a existing  problem");
});

export default router;

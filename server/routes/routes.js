import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import register from "../controllers/auth/register.js";
import localLogin from "../controllers/auth/localLogin.js";
import validateJwt from "../middlware/validateJwt.js";
import profile from "../controllers/Profile/profile.js";
import googleLogin from "../controllers/auth/googleLogin.js";
import compiler from "../controllers/compiler/compiler.js";
import getProblems from "../controllers/problems/problems-get.js";
import problemCompiler from "../controllers/compiler/problem.js";

// router.get("/", async (req, res) => {
//   console.log("Home Route");
//   res.send("Home Route");
// });

//auth routes
router.post("/v1/auth/register", register);
router.post("/v1/auth/local/login", localLogin);
router.post("/v1/auth/google/login", googleLogin);

router.post("/v1/profile", validateJwt, profile);
router.get("/v1/logout", (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
});
router.post("/v1/compiler", validateJwt, compiler);

// 1 HLD
router.get("/v1/problems", validateJwt, getProblems);

router.post("/v1/problem/submit/:id", validateJwt, problemCompiler);

export default router;

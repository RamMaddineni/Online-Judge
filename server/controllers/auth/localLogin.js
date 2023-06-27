import User from "../../models/userSchema.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
dotenv.config();
const localLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.find({ email: email });

    // console.log(user, user.length, user[0].password, password);
    if (user.length && user[0].password === password) {
      // console.log("came here");
      const tokenId = uuidv4();
      const token = jwt.sign(
        { email: user.email, tokenId: tokenId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const cookieOptions = {
        domain: "localhost",
        path: "/",
        secure: true,
        httpOnly: true,
      };
      res.cookie("token", token, cookieOptions);
      res.json({
        success: true,
        message: "Login Successful",
        email: user[0].email,
      });
      return;
    } else {
      res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default localLogin;

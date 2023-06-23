import User from "../../models/userSchema.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
dotenv.config();
const localLogin = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId, password);
  try {
    const user = await User.find({ userId: userId });

    console.log(user, user.length, user[0].password, password);
    if (user.length && user[0].password === password) {
      console.log("came here");
      const tokenId = uuidv4();
      const token = jwt.sign(
        { userId, email: user.email, tokenId: tokenId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.json({ success: true, message: "Login Successful" });
      return;
    } else {
      res.status(401).json({
        success: false,
        message: "Wrong Credentials",
        user,
        userId,
        password,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default localLogin;

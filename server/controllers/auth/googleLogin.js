import User from "../../models/userSchema.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const googleLogin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const tokenId = uuidv4();
    const token = jwt.sign(
      { name, email: email, tokenId: tokenId },
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

    let doc = await User.find({ email: email });
    if (doc.length) {
      res.json({ message: "success", success: true });
      return;
    }
    let user = new User({
      name: name,
      email: email,
      password: password,
    });
    await user.save();

    res.json({ message: "success", success: true });
  } catch (err) {
    console.log(err.message);
    res
      .status(401)
      .json({ success: false, message: "Error while Google sign in" });
  }
};

export default googleLogin;

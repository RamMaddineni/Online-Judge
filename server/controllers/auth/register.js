import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const register = async (req, res) => {
  const { userId, email, password } = req.body;
  try {
    let doc = await User.find({ userId: userId });
    if (doc.length) {
      res.status(309).json({
        success: false,
        duplicate: true,
        duplicateItem: "userId",
        message: `${userId} has taken 😓, try another!`,
      });
      return;
    }
    doc = await User.find({ email: email });
    if (doc.length) {
      res.status(309).json({
        success: false,
        duplicate: true,
        duplicateItem: "email",
        message: `${email} was already registered`,
      });
      return;
    }
    let user = new User({
      userId: userId,
      email: email,
      password: password,
    });
    await user.save();

    res.json({ message: "success", success: true });
  } catch (err) {
    console.log(err.message);
    res
      .status(401)
      .json({ success: false, message: "Error while registering User" });
  }
};

export default register;

import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let doc = await User.find({ email: email });
    if (doc.length) {
      res.status(309).json({
        success: false,
        duplicate: true,
        duplicateItem: "email",
        message: `${email} was already registered , please login instead`,
      });
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
      .json({ success: false, message: "Error while registering User" });
  }
};

export default register;

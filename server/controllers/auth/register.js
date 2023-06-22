import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const register = async (req, res) => {
  console.log("got here");
  const { userId, email, password } = req.body;
  console.log(userId, email, password);
  try {
    let doc = await User.find({ userId: userId });
    console.log("doc : ", doc);
    if (doc.length) {
      res
        .status(409)
        .json({ success: false, duplicate: true, duplicateItem: "userId" });
      return;
    }
    doc = await User.find({ email: email });
    if (doc.length) {
      res
        .status(409)
        .json({ success: false, duplicate: true, duplicateItem: "email" });
      return;
    }
    let user = new User({
      userId: userId,
      email: email,
      password: password,
    });
    await user.save();
    user = { userId: user.userId, email: user.email };
    console.log(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30s" });
    res.json({ message: "success", success: true, token: token });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res
      .status(401)
      .json({ success: false, message: "Error while registering User" });
  }
};

export default register;

import User from "../../models/userSchema.js";

const profile = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length) {
      res
        .status(200)
        .json({ success: true, message: "User Found", profile: user[0] });
    } else {
      res
        .status(404)
        .json({ success: false, message: "User Not Found", USER: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, USER: false });
  }
};

export default profile;

import jwt from "jsonwebtoken";

const validateJwt = (req, res, next) => {
  console.log("Cookies", req.cookies);
  if (!req.cookies.token) {
    res.status(401).json({ success: false, message: "Invalid User" });
  }
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ success: false, message: err.message });
      return;
    }
    if (decoded.userId !== req.body.userId) {
      res.status(401).json({ success: false, message: "Invalid User" });
    }

    next();
  });
};
export default validateJwt;

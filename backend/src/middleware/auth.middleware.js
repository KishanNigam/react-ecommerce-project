const jwt = require("jsonwebtoken");

exports.protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, token missing",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

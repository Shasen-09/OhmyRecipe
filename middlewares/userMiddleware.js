const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(401).json({ success: false, message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ success: false, message: "Token expired" });
        }
        return res.status(401).json({ success: false, message: "Unauthorized user" });
      }

      // ✅ Set user info here
      req.user = { _id: decoded.id };
      next();
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

module.exports = userMiddleware;

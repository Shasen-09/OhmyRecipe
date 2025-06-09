const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing"
      });
    }

    const token = authHeader.split(" ")[1]; // Expected format: "Bearer <token>"

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing from authorization header"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user"
        });
      }

      req.body.id = decoded.id;
      next();
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error
    });
  }
};

module.exports = userMiddleware;

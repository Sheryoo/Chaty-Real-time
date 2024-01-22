const jwt = require("jsonwebtoken");

const authenticationController = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided", data: null });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
    req.user = { id, email };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        status: false,
        message: "Not authorized to access this route",
        data: null,
      });
  }
};

module.exports = authenticationController;

const AppError = require("../error/AppError");
const config = require("../../config");
const jwt = require("jsonwebtoken");

const authenticated = async function (req, res, next) {
  const noAuthRoutes = config.noAuthRoutes;
  const pathname = req._parsedUrl.pathname;
  const isNoAuthRoute = noAuthRoutes.includes(pathname);
  if (isNoAuthRoute) return next();
  // get bearer token from header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new AppError("Unauthorized", 401);

  const decoded = jwt.verify(token, config.jwtSecret);

  if (!decoded) throw new AppError("Unauthorized", 401);

  req.user = decoded;
  next();
};

module.exports = authenticated;

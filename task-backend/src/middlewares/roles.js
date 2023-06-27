const AppError = require("../error/AppError");

const roles = function (roles = []) {
  return (req, res, next) => {
    if (roles.includes(req?.user?.role)) {
      next();
    } else {
      next(new AppError("Unauthorized", 401));
    }
  };
};

module.exports = roles;

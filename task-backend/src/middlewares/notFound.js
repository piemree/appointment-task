const AppError = require("../error/AppError");

const notFound = (req, res, next) => next(new AppError("Not Found", 404));

module.exports = notFound;



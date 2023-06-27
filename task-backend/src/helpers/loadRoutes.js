const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");
module.exports = (routers, app) => {
  routers.forEach((router) => {
    app.use(`/api/${router.prefix}`, router);
  });
  app.use(notFound);
  app.use(errorHandler);
  return Promise.resolve();
};

(async () => {
  require("dotenv").config();
  const express = require("express");
  require("express-async-errors");
  const cors = require("cors");
  const authenticated = require("./middlewares/authenticated");
  const { loadModules, loadRoutes, connectDb } = require("./helpers");
  const config = require("../config");
  const logger = require("./logger");
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(authenticated);

  try {
    await connectDb();
    const routers = await loadModules();
    await loadRoutes(routers, app);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  const nodeApp = app.listen(config.port, async () => {
    console.log(`Server is running on port ${nodeApp.address().port}`);
  });
})();

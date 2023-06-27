const path = require("path");
const fs = require("fs");

function loadModules() {
  return new Promise((resolve, reject) => {
    const modulesPath = "../modules";
    const directoryPath = path.join(__dirname, modulesPath);

    fs.readdir(directoryPath, (err, moduleFolders) => {
      if (err) return reject(err);

      let routers = moduleFolders.map((moduleFolder) => {
        if (moduleFolder === "base") return;

        const modulePath = path.join(directoryPath, moduleFolder, "index.js");

        if (fs.existsSync(modulePath)) {
          const Model = require(modulePath);
          return Model.router;
        }
      });
      routers = routers.filter((r) => r);
      resolve(routers);
    });
  });
}

module.exports = loadModules;

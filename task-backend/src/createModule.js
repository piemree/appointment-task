const fs = require("fs");
const path = require("path");

const createModule = (name) => {
  const modulePath = path.join(__dirname, "modules", name);
  fs.mkdirSync(modulePath);

  const files = ["controller", "model", "router", "service", "index"];
  files.forEach((file) => {
    let filePath = path.join(modulePath, `${name}.${file}.js`);
    const UpperName = name.charAt(0).toUpperCase() + name.slice(1);
    let content = "";
    if (file === "router") {
      content = `class ${UpperName}Router {
        #router;
        #controller;
        constructor(controller, router, prefix) {
          this.#router = router;
          this.#controller = controller;
          this.#router.prefix = prefix;
          this.#router.get("/", this.#controller?.getAll);
          this.#router.get("/:id", this.#controller?.getOne);
          this.#router.post("/", this.#controller?.create);
          this.#router.put("/:id", this.#controller?.update);
          this.#router.delete("/:id", this.#controller?.delete);
        }
        get router() {
          return this.#router;
        }
        get controller() {
          return this.#controller;
        }
}

module.exports = ${UpperName}Router;`;
    } else if (file === "controller") {
      content = `const BaseController = require("../base/base.controller");

class ${UpperName}Controller extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = ${UpperName}Controller;
`;
    } else if (file === "service") {
      content = `const BaseService = require("../base/base.service");

      class ${UpperName}Service extends BaseService {
        constructor(model) {
          super(model);
        }
      }
      
      module.exports = ${UpperName}Service;
      `;
    } else if (file === "model") {
      content = `const mongoose = require("mongoose");
      const Schema = mongoose.Schema;
      
      const ${UpperName}Schema = new Schema({

        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      });
      
      module.exports = mongoose.model("${UpperName}", ${UpperName}Schema);
      `;
    } else if (file === "index") {
      filePath = path.join(modulePath, "index.js");
      content = `const router = require("express").Router();
      const ${UpperName}Model = require("./${name}.model");
      const ${UpperName}Service = require("./${name}.service");
      const ${UpperName}Controller = require("./${name}.controller");
      const ${UpperName}Router = require("./${name}.router");
      const BaseModule = require("../base/base.module");
      
      class ${UpperName}Module extends BaseModule {
        constructor() {
        super();
        this._prefix = "${name}";
        this._model = ${UpperName}Model;
        this._service = new ${UpperName}Service(this._model);
        this._controller = new ${UpperName}Controller(this._service);
        this._router = new ${UpperName}Router(this._controller, router, this._prefix);
        }
      }
      
      module.exports = new ${UpperName}Module();
      `;
    }
    fs.writeFileSync(filePath, content);
  });
};

const moduleName = process.argv[2];
if (moduleName) {
  createModule(moduleName);
} else {
  console.log("Please provide a module name as an argument.");
}

const roles = require("../../middlewares/roles");

class ClinicRouter {
  #router;
  #controller;
  constructor(controller, router, prefix) {
    this.#router = router;
    this.#controller = controller;
    this.#router.prefix = prefix;
    this.#router.get("/", this.#controller?.getAll);
    this.#router.get("/:id", this.#controller?.getOne);
    this.#router.post("/", this.#controller?.create);
    this.#router.put("/", this.#controller?.update);
    // get my clinic
    this.#router.get(
      "/get/myClinic",
      roles(["clinic"]),
      this.#controller?.getMyClinic
    );
  }
  get router() {
    return this.#router;
  }
  get controller() {
    return this.#controller;
  }
}

module.exports = ClinicRouter;

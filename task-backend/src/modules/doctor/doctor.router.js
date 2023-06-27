const multerMiddleware = require("../../middlewares/multerMiddleware");
const roles = require("../../middlewares/roles");

class DoctorRouter {
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

    this.#router.put(
      "/uploadImage/:id",
      roles(["clinic", "superClinic"]),
      multerMiddleware.single("image"),
      this.controller.uploadImage
    );
    this.#router.put(
      "/add/treatment/:id",
      roles(["clinic", "superClinic"]),
      this.controller.addTreatment
    );
  }
  get router() {
    return this.#router;
  }
  get controller() {
    return this.#controller;
  }
}

module.exports = DoctorRouter;

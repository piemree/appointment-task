class AuthRouter {
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
    this.#router.post("/user/login", this.controller.loginUser);
    this.#router.post("/user/register", this.controller.registerUser);
    this.#router.post("/clinic/login", this.controller.loginClinic);
    this.#router.post("/clinic/register", this.controller.registerClinic);
  }

  get router() {
    return this.#router;
  }
  get controller() {
    return this.#controller;
  }
}

module.exports = AuthRouter;

class TreatmentRouter {
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

module.exports = TreatmentRouter;

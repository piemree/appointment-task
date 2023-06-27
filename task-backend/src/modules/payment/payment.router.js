class PaymentRouter {
  #router;
  #controller;
  constructor(controller, router, prefix) {
    this.#router = router;
    this.#controller = controller;
    this.#router.prefix = prefix;
    this.#router.post("/create", this.#controller?.createPayment);
  }
  get router() {
    return this.#router;
  }
  get controller() {
    return this.#controller;
  }
}

module.exports = PaymentRouter;

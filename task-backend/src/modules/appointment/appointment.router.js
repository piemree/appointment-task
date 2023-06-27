const roles = require("../../middlewares/roles");
class AppointmentRouter {
  #router;
  #controller;
  constructor(controller, router, prefix) {
    this.#router = router;
    this.#controller = controller;
    this.#router.prefix = prefix;
    this.#router.get("/", roles(["superClinic"]), this.#controller?.getAll);
    this.#router.get(
      "/getMyAppointments",
      roles(["user"]),
      this.#controller?.getMyAppointments
    );
    this.#router.get(
      "/getMyClinicAppointments",
      roles(["clinic"]),
      this.#controller?.getMyClinicAppointments
    );
    this.#router.get("/:id", roles(["superClinic"]), this.#controller?.getOne);
    this.#router.get(
      "/user/getOne/:id",
      roles(["user"]),
      this.#controller?.getOneUserAppointment
    );
    this.#router.get(
      "/clinic/getOne/:id",
      roles(["clinic"]),
      this.#controller?.getOneClinicAppointment
    );
    this.#router.post("/", roles(["user"]), this.#controller?.create);
    this.#router.put(
      "/cancel/:id",
      roles(["user"]),
      this.#controller?.cancelAppointment
    );
  }
  get router() {
    return this.#router;
  }
  get controller() {
    return this.#controller;
  }
}

module.exports = AppointmentRouter;

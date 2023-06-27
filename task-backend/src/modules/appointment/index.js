const router = require("express").Router();
const AppointmentModel = require("./appointment.model");
const AppointmentService = require("./appointment.service");
const AppointmentController = require("./appointment.controller");
const AppointmentRouter = require("./appointment.router");
const BaseModule = require("../base/base.module");
const DoctorModule = require("../doctor");

class AppointmentModule extends BaseModule {
  constructor() {
    super();
    this._prefix = "appointment";
    this._model = AppointmentModel;
    this._service = new AppointmentService(this._model);
    this._controller = new AppointmentController(
      this._service,
      DoctorModule._service
    );
    this._router = new AppointmentRouter(
      this._controller,
      router,
      this._prefix
    );
  }
}

module.exports = new AppointmentModule();

const router = require("express").Router();
const DoctorModel = require("./doctor.model");
const DoctorService = require("./doctor.service");
const DoctorController = require("./doctor.controller");
const DoctorRouter = require("./doctor.router");
const BaseModule = require("../base/base.module");
const ClinicModule = require("../clinic");

class DoctorModule extends BaseModule {
  constructor() {

    super();
    this._prefix = "doctor";
    this._model = DoctorModel;
    this._service = new DoctorService(this._model);
    this._controller = new DoctorController(this._service, ClinicModule._service);
    this._router = new DoctorRouter(this._controller, router, this._prefix);
  }
}

module.exports = new DoctorModule();

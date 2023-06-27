const router = require("express").Router();
const ClinicModel = require("./clinic.model");
const ClinicService = require("./clinic.service");
const ClinicController = require("./clinic.controller");
const ClinicRouter = require("./clinic.router");
const BaseModule = require("../base/base.module");

class ClinicModule extends BaseModule {
  constructor() {
    super();
    this._prefix = "clinic";
    this._model = ClinicModel;
    this._service = new ClinicService(this._model);
    this._controller = new ClinicController(this._service);
    this._router = new ClinicRouter(this._controller, router, this._prefix);
  }
}

module.exports = new ClinicModule();

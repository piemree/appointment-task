const router = require("express").Router();
const PaymentService = require("./payment.service");
const PaymentController = require("./payment.controller");
const PaymentRouter = require("./payment.router");
const PaymentGateway = require(".//payment.gateway");
const BaseModule = require("../base/base.module");
const UserModule = require("../user");
const TreatmentModule = require("../treatment");

class PaymentModule extends BaseModule {
  constructor() {
    super();
    this._prefix = "payment";
    this._service = new PaymentService(PaymentGateway);
    this._controller = new PaymentController(
      this._service,
      UserModule._service,
      TreatmentModule._service
    );
    this._router = new PaymentRouter(this._controller, router, this._prefix);
  }
}

module.exports = new PaymentModule();

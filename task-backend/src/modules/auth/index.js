const router = require("express").Router();
const AuthService = require("./auth.service");
const AuthController = require("./auth.controller");
const AuthRouter = require("./auth.router");
const BaseModule = require("../base/base.module");
const UserModule = require("../user");
const ClinicModule = require("../clinic");

class AuthModule extends BaseModule {
  constructor() {
    super();
    this._prefix = "auth";
    this._model = UserModule.model;
    this._service = new AuthService(this._model);
    this._controller = new AuthController(this._service, ClinicModule._service);
    this._router = new AuthRouter(this._controller, router, this._prefix);
  }
}

module.exports = new AuthModule();

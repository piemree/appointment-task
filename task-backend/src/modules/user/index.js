const router = require("express").Router();
const UserModel = require("./user.model");
const UserService = require("./user.service");
const UserController = require("./user.controller");
const UserRouter = require("./user.router");
const BaseModule = require("../base/base.module");

class UserModule extends BaseModule {
  constructor() {
    super();
    this._prefix = "user";
    this._model = UserModel;
    this._service = new UserService(this._model);
    this._controller = new UserController(this._service);
    this._router = new UserRouter(this._controller, router, this._prefix);
  }
}

module.exports = new UserModule();

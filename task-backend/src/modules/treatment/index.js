const router = require("express").Router();
      const TreatmentModel = require("./treatment.model");
      const TreatmentService = require("./treatment.service");
      const TreatmentController = require("./treatment.controller");
      const TreatmentRouter = require("./treatment.router");
      const BaseModule = require("../base/base.module");
      
      class TreatmentModule extends BaseModule {
        constructor() {
        super();
        this._prefix = "treatment";
        this._model = TreatmentModel;
        this._service = new TreatmentService(this._model);
        this._controller = new TreatmentController(this._service);
        this._router = new TreatmentRouter(this._controller, router, this._prefix);
        }
      }
      
      module.exports = new TreatmentModule();
      
class BaseModule {
  _prefix = "";
  _model;
  _service;
  _controller;
  _router;
  get router() {
    return this._router?.router;
  }
  get model() {
    return this._model;
  }
}

module.exports = BaseModule;

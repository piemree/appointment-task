class BaseController {
  #service;
  constructor(service) {
    this.#service = service;
  }
  get service() {
    return this.#service;
  }
  getAll = async (req, res) => {
    const data = await this.#service.getAll();
    res.status(200).json(data);
  };

  getOne = async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    res.status(200).json(data);
  };

  create = async (req, res) => {
    const data = await this.#service.create(req.body);
    res.status(201).json({ success: true });
  };

  update = async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    res.status(200).json({ success: true });
  };

  delete = async (req, res) => {
    const data = await this.#service.delete(req.params.id);
    res.status(200).json({ success: true });
  };
}

module.exports = BaseController;

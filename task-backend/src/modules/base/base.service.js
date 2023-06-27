class BaseService {
  #model;
  constructor(model) {
    this.#model = model;
  }
  get model() {
    return this.#model;
  }
  getAll = async () => {
    return await this.#model.find();
  };

  find = async (query) => {
    return await this.#model.find(query);
  };

  findById = async (id) => {
    return await this.#model.findById(id);
  };

  findOne = async (query) => {
    return await this.#model.findOne(query);
  };

  create = async (data) => {
    return await this.#model.create(data);
  };

  update = async (id, data) => {
    return await this.#model.updateOne({ _id: id }, data);
  };

  updateMany = async (query, data) => {
    return await this.#model.updateMany(query, data);
  };

  delete = async (id) => {
    return await this.#model.deleteOne({ _id: id });
  };
}

module.exports = BaseService;

const BaseService = require("../base/base.service");

class DoctorService extends BaseService {
  constructor(model) {
    super(model);
  }
  findById = async (id) => {
    return await this.model.findById(id).populate("treatments").populate("clinic");
  };
}

module.exports = DoctorService;

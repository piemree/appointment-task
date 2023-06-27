const BaseService = require("../base/base.service");

class ClinicService extends BaseService {
  constructor(model) {
    super(model);
  }
  findByEmail = async (email) => {
    return await this.model.findOne({ email });
  };
  findById = async (id) => {
    return await this.model.findById(id).populate({
      path: "doctors",
      populate: {
        path: "treatments",
      },
    });
  };
  getAll = async () => {
    return await this.model
      .find()
      .populate({
        path: "doctors",
        populate: {
          path: "treatments",
        },
      })
      .select("-password -role -__v");
  };
}

module.exports = ClinicService;

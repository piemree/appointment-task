const BaseController = require("../base/base.controller");

class ClinicController extends BaseController {
  constructor(service) {
    super(service);
  }
  getOne = async (req, res) => {
    const id = req.params.id;
    const clinic = await this.service.findById(id);
    if (!clinic) {
      throw new AppError("Clinic not found", 404);
    }
    res.status(200).json(clinic);
  };

  update = async (req, res) => {
    const id = req.user.id;
    const body = req.body;
    await this.service.update(id, body);
    res.status(200).json({ success: true });
  };

  getMyClinic = async (req, res) => {
    const clinic = await this.service.findOne({ _id: req.user.id });
    return res.status(200).json({ success: true, data: clinic });
  };
}

module.exports = ClinicController;

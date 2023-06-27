const BaseController = require("../base/base.controller");
const { uploadImage } = require("../../helpers/cloudinaryHelper");
const AppError = require("../../error/AppError");
const fs = require("fs");

class DoctorController extends BaseController {
  #clinicService;
  constructor(service, clinicService) {
    super(service);
    this.#clinicService = clinicService;
  }

  create = async (req, res) => {
    const clinicId = req.user.id;
    const body = req.body;
    const doctor = await this.service.create({
      ...body,
      clinic: clinicId,
    });
    await this.#clinicService.update(clinicId, {
      $addToSet: { doctors: doctor._id },
    });
    return res.status(201).json({ success: true });
  };

  uploadImage = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const file = req.file;
      if (!file) throw new AppError("Please upload a file");
      const result = await uploadImage(file?.path);
      await this.service.update(doctorId, {
        image: result.secure_url,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  };

  addTreatment = async (req, res) => {
    const doctorId = req.params.id;
    const { treatments } = req.body;
    await this.service.update(doctorId, {
      $addToSet: { treatments },
    });
    return res.status(200).json({ success: true });
  };
  getOne = async (req, res) => {
    const id = req.params.id;
    const doctor = await this.service.findById(id);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }
    res.status(200).json(doctor);
  }
}

module.exports = DoctorController;

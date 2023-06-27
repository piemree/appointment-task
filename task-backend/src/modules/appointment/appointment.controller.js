const AppError = require("../../error/AppError");
const BaseController = require("../base/base.controller");
const moment = require("moment");

class AppointmentController extends BaseController {
  #doctorService;
  constructor(service, doctorService) {
    super(service);
    this.#doctorService = doctorService;
  }

  create = async (req, res) => {
    const body = req.body;
    const patientId = req.user.id;

    const date = moment(body.date).toDate();

    const minute = date.getMinutes();
    const hour = date.getHours();
    const now = new Date();

    if (minute !== 0 || date < now) {
      throw new AppError("Invalid date", 400);
    }
    if (hour < 6 || hour > 19) {
      throw new AppError("Invalid date", 400);
    }
    const doctor = await this.#doctorService.findOne({
      _id: body.doctor,
      clinic: body.clinic,
      treatments: body.treatment,
    });
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }
    const isDoctorAvailableRequest = this.service.checkDocktorAvailable(
      body.doctor,
      date
    );
    const isPatientAvailableRequest = this.service.checkPatientAvailable(
      patientId,
      date
    );
    const [isDoctorAvailable, isPatientAvailable] = await Promise.all([
      isDoctorAvailableRequest,
      isPatientAvailableRequest,
    ]);

    if (!isDoctorAvailable) {
      throw new AppError("Doctor is not available at this time", 400);
    }
    if (!isPatientAvailable) {
      throw new AppError("You already have an appointment at this time", 400);
    }

    const appointment = await this.service.create({
      ...body,
      patient: patientId,
      date,
    });

    return res.status(201).json({ success: true, data: appointment });
  };

  getMyAppointments = async (req, res) => {
    const appointments = await this.service.find({ patient: req.user.id });
    return res.status(200).json({ success: true, data: appointments });
  };
  getMyClinicAppointments = async (req, res) => {
    const appointments = await this.service.find({ clinic: req.user.id });
    return res.status(200).json({ success: true, data: appointments });
  };
  getOneUserAppointment = async (req, res) => {
    const appointment = await this.service.findOne({
      _id: req.params.id,
      patient: req.user.id,
    });
    return res.status(200).json({ success: true, data: appointment });
  };
  getOneClinicAppointment = async (req, res) => {
    const appointment = await this.service.findOne({
      _id: req.params.id,
      clinic: req.user.id,
    });
    return res.status(200).json({ success: true, data: appointment });
  };

  // create a controller that returns reservations for a specific doctor
  getDoctorAppointments = async (req, res) => {
    const appointments = await this.service.find({
      doctor: req.params.id,
    });
    return res.status(200).json({ success: true, data: appointments });
  };

  cancelAppointment = async (req, res) => {
    const appointment = await this.service.findOne({
      _id: req.params.id,
      patient: req.user.id,
    });
    if (!appointment) throw new AppError("Appointment not found", 404);

    const canceledAppointment = await this.service.update(
      { _id: req.params.id },
      { isCancelled: true }
    );
    return res.status(200).json({ success: true });
  };
}

module.exports = AppointmentController;

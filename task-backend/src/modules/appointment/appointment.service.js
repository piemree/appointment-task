const BaseService = require("../base/base.service");

class AppointmentService extends BaseService {
  constructor(model) {
    super(model);
  }
  update = async (query, data) => {
    return await this.model.updateOne(query, data);
  };
  checkDocktorAvailable = async (doctorId, date) => {
    const appointment = await this.model.findOne({
      doctor: doctorId,
      date,
      isCancelled: false,
    });
    if (appointment) return false;
    return true;
  };

  checkPatientAvailable = async (patientId, date) => {
    const appointment = await this.model.findOne({
      patient: patientId,
      date,
      isCancelled: false,
    });
    if (appointment) return false;
    return true;
  };
}

module.exports = AppointmentService;

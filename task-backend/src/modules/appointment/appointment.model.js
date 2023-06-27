const mongoose = require("mongoose");
const AppError = require("../../error/AppError");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  clinic: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  treatment: {
    type: Schema.Types.ObjectId,
    ref: "Treatment",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);

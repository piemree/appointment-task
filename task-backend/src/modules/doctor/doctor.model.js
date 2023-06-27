const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  clinic: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  treatments: {
    type: [Schema.Types.ObjectId],
    ref: "Treatment",
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

module.exports = mongoose.model("Doctor", DoctorSchema);

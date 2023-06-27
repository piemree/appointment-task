import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import request from "./request";
import { useState } from "react";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Home() {
  const [clinics, setClinics] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [treatment, setTreatment] = useState([]);

  const [date, setDate] = useState("");

  function onClinicChange(e) {
    const findClinic = clinics.find((clinic) => clinic._id === e.target.value);
    setClinic(findClinic);
  }

  function onDoctorChange(e) {
    const findDoctor = clinic.doctors.find(
      (doctor) => doctor._id === e.target.value
    );
    setDoctor(findDoctor);
    console.log(doctor);
  }

  function onTreatmentChange(e) {
    const findTreatment = doctor.treatments.find(
      (treatment) => treatment._id === e.target.value
    );
    setTreatment(findTreatment);
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    // set date minuetes to 0
    const dateObj = new Date(date);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    console.log(dateObj);
    const appointment = {
      clinic: clinic._id,
      doctor: doctor._id,
      treatment: treatment._id,
      date: dateObj,
    };
    request
      .post("/api/appointment", appointment)
      .then((response) => {
        alert("Appointment created");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error.message);
      });
  }

  function getClinics() {
    request
      .get("/api/clinic")
      .then((response) => {
        setClinics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getClinics();
  }, []);

  return (
    <section>
      {/* create appointment form clinic docktor and treatment */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Create Appointment
          </h1>

          <form className="mt-6" onSubmit={onFormSubmit}>
            <div>
              <label
                className="block text-sm text-gray-800 dark:text-gray-200"
                htmlFor="clinic"
              >
                Clinic
              </label>
              <select
                onChange={onClinicChange}
                id="clinic"
                name="clinic"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Select Clinic</option>
                {clinics?.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label
                className="block text-sm text-gray-800 dark:text-gray-200"
                htmlFor="doctor"
              >
                Doctor
              </label>
              <select
                onChange={onDoctorChange}
                id="doctor"
                name="doctor"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Select Doctor</option>
                {clinic?.doctors?.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label
                className="block text-sm text-gray-800 dark:text-gray-200"
                htmlFor="treatment"
              >
                Treatment
              </label>
              <select
                onChange={onTreatmentChange}
                id="treatment"
                name="treatment"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Select Treatment</option>
                {doctor?.treatments?.map((treatment) => (
                  <option key={treatment._id} value={treatment._id}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label
                className="block text-sm text-gray-800 dark:text-gray-200"
                htmlFor="date"
              >
                Date
              </label>

              <input
                onChange={onDateChange}
                id="date"
                type="datetime-local"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                placeholder="Date"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

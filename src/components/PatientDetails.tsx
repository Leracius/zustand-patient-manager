import { Patient } from "../types";
import PatientDetailtItem from "./PatientDetailItem";
import { userPatientStore } from "../store";
import { toast } from "react-toastify";
import { useState } from "react";

type PatientDetailsProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const deletePatient = userPatientStore((state) => state.deletePatient);
  const getPatientById = userPatientStore((state) => state.getPatientById);

  const [show, setShow] = useState(true);

  const handleClick = (id: Patient["id"]) => {
    deletePatient(id);
    toast.error("Paciente eliminado");
  };

  return (
    <>
      {show ? (
        <div className=" flex items-center justify-between px-5 py-5 m-4 lg:m-0 bg-slate-800 border-t-2 shadow-md ">
          <PatientDetailtItem label={"NOMBRE"} data={patient.name} />
          <button onClick={() => setShow(!show)} className="text-white ">
            ver mas
          </button>
        </div>
      ) : (
        <div className=" p-3 bg-slate-800 border-t-2 shadow-md">
          <PatientDetailtItem label={"ID"} data={patient.id} />
          <PatientDetailtItem label={"NOMBRE"} data={patient.name} />
          <PatientDetailtItem label={"PROPIETARIO"} data={patient.caretaker} />
          <PatientDetailtItem label={"EMAIL"} data={patient.email} />
          <PatientDetailtItem label={"FECHA"} data={patient.date.toString()} />
          <PatientDetailtItem label={"SINTOMAS"} data={patient.symptoms} />
          <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
            <button
              type="button"
              className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
              onClick={() => getPatientById(patient.id)}
            >
              Editar
            </button>
            <button
              type="button"
              className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
              onClick={() => handleClick(patient.id)}
            >
              Eliminar
            </button>
          </div>
          <button
            onClick={() => setShow(!show)}
            className="text-slate-400 w-full text-center pt-2 lg:pt-0"
          >
            ver menos
          </button>
        </div>
      )}
    </>
  );
}

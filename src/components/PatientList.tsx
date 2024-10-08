import { userPatientStore } from "../store";
import PatientDetails from "./PatientDetails";
import { useState } from "react";

export default function PatientList() {
  const patients = userPatientStore((state) => state.patients);
  const [show, setShow] = useState(true);

  return (
    <div className="bg-[#3939395f] w-full lg:w-2/5 pb-20 lg:pb-0 pt-10 lg:mt-20 lg:rounded-xl lg:border-2 border-b-2 overflow-hidden">
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center text-white">
            Listado de pacientes
          </h2>
          <p className="text-lg mt-2 text-white text-center mb-5">
            Administra tus{" "}
            <span className="text-indigo-300 font-bold">Pacientes y citas</span>
          </p>
          <button
            onClick={() => setShow(!show)}
            className="text-white p-2 hidden lg:block"
          >
            {show ? "ver menos" : "ver más"}
          </button>
          {show && (
            <div>
              {patients.map((patient) => {
                return <PatientDetails key={patient.id} patient={patient} />;
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center text-white">
            No hay pacientes
          </h2>
          <p className="text-lg mt-2 text-white text-center mb-5">
            Comieza agregando pacientes{" "}
            <span className="text-indigo-300 font-bold">
              {" "}
              y apareceran en este lugar
            </span>
          </p>
          <p className="text-white p-2">o puedes mirar la doc</p>
        </>
      )}
    </div>
  );
}

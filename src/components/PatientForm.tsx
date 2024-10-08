import { useForm } from "react-hook-form";
import Error from "./Error";
import type { DraftPatient } from "../types";
import { userPatientStore } from "../store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PatientForm() {
  const { addPatient, activeId, patients, updatePatient } = userPatientStore();
  console.log(patients);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DraftPatient>();

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      toast.warning("verifica los campos del formulario para modificar");
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("date", activePatient.date);
      setValue("email", activePatient.email);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [activeId]);

  // en la doc oficial de react hook form el parametro data se extrae de la funcion
  // handleSubmit - onSubmit={handleSubmit(data)} pero aca se pasa una funcion que terceriza
  // el procedimiento y rescata el parametro
  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data);
      toast.success("paciente actualizado correctamente");
    } else {
      addPatient(data);
      toast.success("paciente registrado correctamente");
    }

    reset();
  };

  const [show, setShow] = useState(true);

  // my-1 md:w-1/2 lg:w-2/5 bg-[#3939395f] pt-10 rounded-xl mt-10 p-3 mb-10

  return (
    <div className="bg-[#3939395f] w-full lg:w-2/5  pt-10 pb-10 lg:pb-0 lg:mt-20 lg:rounded-xl lg:border-2 lg:border-b-2 overflow-hidden ">
      <h2 className="font-black text-3xl text-center text-white">
        Seguimiento Pacientes
      </h2>

      <p className="text-lg mt-2 text-white text-center mb-5">
        Añade Pacientes y {""}
        <span className="text-indigo-300 font-bold">Administralos</span>
      </p>

      <button
        onClick={() => setShow(!show)}
        className="text-white p-2 hidden lg:block"
      >
        {show ? "ver menos" : "ver más"}
      </button>

      <form
        className={`lg:border-t-2 lg:bg-slate-800 bg-transparent py-5 px-5 ${
          !show && "hidden"
        }`}
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-white text-sm uppercase font-bold px-2"
          >
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es oblgiatorio",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="caretaker"
            className="text-white text-sm uppercase font-bold px-2"
          >
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario es oblgiatorio",
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker?.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-white text-sm uppercase font-bold px-2"
          >
            Email
          </label>
          <input
            id="email"
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="date"
            className="text-white text-sm uppercase font-bold px-2"
          >
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
            type="date"
            {...register("date", {
              required: "La fecha es obligatoria",
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-white text-sm uppercase font-bold px-2"
          >
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Los sintomas son obligatorios",
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}

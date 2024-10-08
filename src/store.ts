import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "./types";
import { devtools, persist } from "zustand/middleware";

// tipo del estado
type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

//funcion para agregar un id a un objeto draft (el mismo obj pero sin id)
const createPatient = (patient: DraftPatient) => {
  return { ...patient, id: uuidv4() };
};

//el store como tal de donde instanciamos luego para llamarlo
//se engloba todo el cuerpo de la funcion con parentesis ()=>({})
// y tambien necesita un tipo de estado
//el parametro set permite hacer modificaciones diractas al state

// EJ SIN DEVTOOLS
// export const demoStore = create<DemoType> = (set) => ({
//    data: [],
//     addPatient: (data) => {
//     const newPatient = createPatient(data);
//     set((state) => ({
//       patients: [...state.patients, newPatient],
//     }));
//   },
// })

export const userPatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatient = createPatient(data);

          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },

        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },

        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },

        //esta funcion toma el id almacenado en el estado, lo agrega al objeto draft y despues con un map
        //setea al state el objeto que matchea con id el data correspondiente que viene por parametro
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: "",
          }));
        },
        //nueva funcion del store aqui
      }),
      {
        name: "patient-storage",
      }
    )
  )
);

// para editar un objeto primero tenemos que "marcar" como un id activo en el store
// cual vamos a modificar, y luego hacer los cambios correspondientes

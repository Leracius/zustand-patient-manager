type HomeProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
};

export default function Home({ setActive, active }: HomeProps) {
  return (
    <div className="p-5 h-screen flex flex-col items-center lg:justify-center gap-5 ">
      <h1 className="text-4xl font-bold text-indigo-300 text-center p-10 lg:py-4 lg:text-6xl rounded-xl ">
        Seguimiento de turnos{" "}
        <span className="text-white">organiza y modifica citas.</span>
      </h1>
      <div className=" w-full p-5 flex flex-col lg:flex-row justify-center gap-5">
        <div className="bg-[#3939395f] p-8 sm:p-10 rounded-xl w-full sm:w-3/4 md:w-auto border-2">
          <h2 className="font-black text-2xl sm:text-3xl text-center text-white">
            Seguimiento Pacientes
          </h2>
          <p className="text-base sm:text-lg mt-2 text-white text-center mb-5">
            Añade Pacientes y{" "}
            <span className="text-indigo-300 font-bold">Administralos</span>
          </p>
        </div>

        <div className="bg-[#3939395f] p-8 sm:p-10 rounded-xl w-full sm:w-3/4 md:w-auto border-2">
          <h2 className="font-black text-2xl sm:text-3xl text-center text-white">
            Listado de pacientes
          </h2>
          <p className="text-base sm:text-lg mt-2 text-white text-center mb-5">
            Administra tus{" "}
            <span className="text-indigo-300 font-bold">Pacientes y citas</span>
          </p>
        </div>
      </div>
      <button
        className="bg-indigo-700 text-xl font-black text-white py-3 px-12 rounded-xl hover:scale-110 z-20"
        onClick={() => setActive(!active)}
      >
        Añade un nuevo paciente
      </button>
      <p className="text-white text-center">made by axel</p>
    </div>
  );
}

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Home from "./components/Home";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import { useState } from "react";

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="bg-slate-900 min-h-screen absolute -z-0 right-0 left-0">
        {!active ? (
          <Home setActive={setActive} active={active} />
        ) : (
          <>
            <div className=" flex flex-col lg:flex-row lg:items-start justify-center lg:gap-10 items-center  ">
              <button
                onClick={() => setActive(!active)}
                className="lg:fixed w-full lg:w-20  p-2 text-left  top-0 left-0 font-bold text-white lg:bg-transparent bg-[#2423236a]"
              >
                atras
              </button>
              <PatientForm />
              <PatientList />
            </div>
          </>
        )}

        <div
          className={`bg-gradient-to-b from-indigo-900 to-slate-900 md:p-80 p-40 -left-20  top-[-100px] sm:top-[-200px] fixed rounded-full -z-10 transition-transform duration-1000 ease-in-out
            ${active && "-rotate-90 translate-x-[1000px]"}`}
        ></div>
        <div
          className={`bg-gradient-to-t from-indigo-900 to-slate-900 md:p-80 p-40 right-[-100px] sm:right-[-200px] bottom-[-100px] sm:bottom-[-200px] fixed rounded-full -z-10 transition-transform duration-1000 ease-in-out
            ${active && "scale-75"}`}
        ></div>
        <div
          className={`bg-gradient-to-b from-indigo-900 to-slate-900 md:p-52 p-20 -left-20 -bottom-10 fixed rounded-full -z-10 
            transition-transform duration-1000 ease-in-out
            ${active && "-rotate-180 scale-150"}`}
        ></div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;

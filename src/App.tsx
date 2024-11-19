import { FaPause, FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Background = () => {
  return (
    <div
      id="background"
      className="absolute left-0 top-0 h-screen w-screen bg-neutral-950"
    ></div>
  );
};

const MainTimer = () => {
  return (
    <div id="main-timer" className="flex flex-col gap-4 lg:w-[200px]">
      <h1 id="timer-label" className="font-bold">{`Session`}</h1>
      <h1 id="timer-left" className="font-normal">{`25:00`}</h1>
      <div
        id="controls"
        className="flex flex-row place-content-center content-center gap-10"
      >
        <FaPause />
        <FaUndoAlt />
        <IoSettingsSharp />
      </div>
      <div
        id="progress-bar"
        className="h-2 w-full rounded-sm bg-neutral-50"
      ></div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Background />
      <div
        id="pomodoro-assembly"
        className="relative flex h-screen select-none flex-row place-content-center items-center justify-center text-center text-xl text-neutral-50"
      >
        <MainTimer />
      </div>
    </>
  );
};

export default App;

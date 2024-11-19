import { FaArrowDown, FaArrowUp, FaPause, FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Background = () => {
  return (
    <div
      id="background"
      className="absolute left-0 top-0 h-screen w-screen bg-neutral-950"
    ></div>
  );
};

const MainTimer = (props: { activeTimer: string }) => {
  return (
    <div
      id="main-timer"
      className={`flex flex-col place-content-center items-center justify-center gap-4 md:w-[200px]`}
    >
      <h1 id="timer-label" className="font-bold">
        {props.activeTimer}
      </h1>
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
        className="h-2 w-80 rounded-sm bg-neutral-50 sm:w-80 md:w-full"
      ></div>
    </div>
  );
};

const SetTimer = (props: { id: string }) => {
  return (
    <div
      id={`set-${props.id}-timer`}
      className={`flex flex-col gap-4 md:w-[200px]`}
    >
      <h1 id={`${props.id}-label`} className="font-bold">
        {props.id}
      </h1>
      <div
        id={`${props.id}-controls`}
        className="flex flex-row place-content-center content-center gap-10 text-center"
      >
        <FaArrowUp id={`${props.id}-increment`} />
        <h1 id={`${props.id}-length`} className="font-normal">{`05:00`}</h1>
        <FaArrowDown id={`${props.id}-decrement`} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Background />
      <div
        id="pomodoro-assembly"
        className="relative flex h-screen select-none flex-col place-content-center items-center justify-center gap-12 overflow-x-hidden p-9 text-center text-xl text-neutral-50 sm:flex-col md:flex-row"
      >
        <SetTimer id="Break" />
        <MainTimer activeTimer="Session" />
        <SetTimer id="Session" />
      </div>
    </>
  );
};

export default App;

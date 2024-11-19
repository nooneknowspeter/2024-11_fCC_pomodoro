import { useState } from "react";
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

const MainTimer = (props: {
  activeTimer: string;
  onClickSettings: () => void;
  onClickPlayPause: () => void;
}) => {
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
        <button id="start_stop" onClick={props.onClickPlayPause}>
          <FaPause />
        </button>
        <button id="reset">
          <FaUndoAlt />
        </button>
        <button id="settings" onClick={props.onClickSettings}>
          <IoSettingsSharp />
        </button>
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
        <button id={`${props.id}-increment`}>
          <FaArrowUp />
        </button>
        <h1 id={`${props.id}-length`} className="font-normal">{`5`}</h1>
        <button id={`${props.id}-decrement`}>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [playpause, setPlayPause] = useState(false);
  const [options, setOptions] = useState(false);

  const playPause = () => {
    console.log("play-pause");
  };

  const settings = () => {
    console.log("settings");
  };

  return (
    <>
      <Background />
      <div
        id="pomodoro-assembly"
        className="relative flex h-screen select-none flex-col place-content-center items-center justify-center gap-12 overflow-x-hidden p-9 text-center text-xl text-neutral-50 sm:flex-col md:flex-row"
      >
        <SetTimer id="Break" />
        <MainTimer
          activeTimer={`Session`}
          onClickPlayPause={playPause}
          onClickSettings={settings}
        />
        <SetTimer id="Session" />
      </div>
    </>
  );
};

export default App;

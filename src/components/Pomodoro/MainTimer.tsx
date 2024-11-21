import { ReactNode } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const MainTimer = (props: {
  activeTimer: string;
  onClickStartStop: () => void;
  onClickReset: () => void;
  onClickSettings: () => void;
  icon: ReactNode;
  progressBar: ReactNode;
  displayTime: string;
}) => {
  return (
    <div
      id="main-timer"
      className={`flex flex-col place-content-center items-center justify-center gap-4 md:w-[200px]`}
    >
      <h1 id="timer-label" className="font-bold">
        {props.activeTimer}
      </h1>
      <h1 id="time-left" className="font-normal">
        {props.displayTime}
      </h1>
      <div
        id="controls"
        className="flex flex-row place-content-center content-center gap-10"
      >
        <button id="start_stop" onClick={props.onClickStartStop}>
          {props.icon}
        </button>
        <button id="reset" onClick={props.onClickReset}>
          <FaUndoAlt />
        </button>
        <button id="settings" onClick={props.onClickSettings}>
          <IoSettingsSharp />
        </button>
      </div>
      {props.progressBar}
    </div>
  );
};

export default MainTimer;

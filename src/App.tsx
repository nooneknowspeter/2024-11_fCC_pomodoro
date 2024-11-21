import React, { ReactNode, useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import {
  FaArrowDown,
  FaArrowUp,
  FaPause,
  FaPlay,
  FaUndoAlt,
} from "react-icons/fa";
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

const ProgressBar = () => {
  return (
    <>
      <div
        id="progress-bar"
        className="h-2 w-80 rounded-sm bg-neutral-50 sm:w-80 md:w-full"
      ></div>
    </>
  );
};

const SetTimer = (props: {
  id: string;
  onClickIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  displayTime: number;
  order: string;
  setTimerOnChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  let input = props.id;
  const regex = /[a-z]/;
  let toPascalCase = input.replace(regex, (x) => {
    return x.toUpperCase();
  });

  return (
    <div
      id={`set-${props.id}-timer`}
      className={`${props.order} flex flex-col gap-4 md:w-[200px]`}
    >
      <h1 id={`${props.id}-label`} className="font-bold">
        {toPascalCase}
      </h1>
      <div
        id={`${props.id}-controls`}
        className="flex flex-row place-content-center content-center gap-10 text-center"
      >
        <button id={`${props.id}-increment`} onClick={props.onClickIncrement}>
          <FaArrowUp />
        </button>
        {/* display time */}
        <h1 id={`${props.id}-length`} className="text-center font-normal">
          {props.displayTime}
        </h1>
        <button id={`${props.id}-decrement`} onClick={props.onClickDecrement}>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [options, setOptions] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  const [minutes, setMinutes] = useState(sessionTime);
  const [seconds, setSeconds] = useState(0);

  const [activeTimer, setActiveTimer] = useState<"Session" | "Break">(
    "Session",
  );

  useEffect(() => {
    while (isRunning) {
      setActiveTimer("Session");
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            console.log("timer run out");
            if (activeTimer === "Session") {
              setActiveTimer("Break");
              setMinutes(breakTime);
              setSeconds(0);
            } else if (activeTimer === "Break") {
              setActiveTimer("Session");
              setMinutes(sessionTime);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const startStopTimer = () => {
    if (isRunning) {
      console.log("stop");

      setIsRunning(false);
    } else if (!isRunning) {
      console.log("start");

      setIsRunning(true);
    }
  };

  const reset = () => {
    console.log("reset");

    setBreakTime(5);
    setSessionTime(25);
    setMinutes(sessionTime);
  };

  const settings = () => {
    console.log("settings");

    switch (options) {
      case true:
        setOptions(false);
        break;
      case false:
        setOptions(true);
        break;

      default:
        break;
    }
    console.log(options);
  };

  const setBreakTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonID = e.currentTarget.id;

    switch (buttonID) {
      case "break-increment":
        console.log("count increase");
        breakTime < 60 && setBreakTime(breakTime + 1);
        if (!isRunning) {
          setMinutes(breakTime);
          setSeconds(0);
          return;
        }
        break;
      case "break-decrement":
        console.log("count decrease");
        breakTime > 1 && setBreakTime(breakTime - 1);
        if (!isRunning) {
          setMinutes(breakTime);
          setSeconds(0);
          return;
        }
        break;
      default:
        useState(5);
        break;
    }
  };

  const setSessionTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonID = e.currentTarget.id;

    switch (buttonID) {
      case "session-increment":
        console.log("count increase");
        sessionTime < 60 && setSessionTime(sessionTime + 1);
        if (!isRunning) {
          setMinutes(sessionTime);
          setSeconds(0);
          return;
        }
        break;
      case "session-decrement":
        console.log("count decrease");
        sessionTime > 1 && setSessionTime(sessionTime - 1);
        if (!isRunning) {
          setMinutes(sessionTime);
          setSeconds(0);
          return;
        }
        break;
      default:
        useState(25);
        break;
    }
  };

  const setTimersOnKeyboardInput = () => {};

  return (
    <>
      <Background />
      <div
        id="pomodoro-assembly"
        className="relative flex h-screen select-none flex-col place-content-center items-center justify-center gap-12 overflow-x-hidden p-9 text-center text-xl text-neutral-50 sm:flex-col md:flex-row"
      >
        {/* main timer */}

        <MainTimer
          activeTimer={activeTimer}
          onClickStartStop={startStopTimer}
          onClickReset={reset}
          onClickSettings={settings}
          displayTime={`${minutes.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}:${seconds.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`}
          icon={isRunning ? <FaPause /> : <FaPlay />}
          progressBar={isRunning && <ProgressBar />}
        />
        {options && (
          <>
            {/* set break timer */}
            <SetTimer
              id="break"
              displayTime={breakTime}
              onClickDecrement={setBreakTimer}
              onClickIncrement={setBreakTimer}
              order={`order-first`}
              setTimerOnChange={setTimersOnKeyboardInput}
            />

            {/* set session timer */}
            <SetTimer
              id="session"
              displayTime={sessionTime}
              onClickDecrement={setSessionTimer}
              onClickIncrement={setSessionTimer}
              order={`order-last`}
              setTimerOnChange={setTimersOnKeyboardInput}
            />
          </>
        )}
      </div>
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.6}
        outerScale={5}
      />
    </>
  );
};

export default App;

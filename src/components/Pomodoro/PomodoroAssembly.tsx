import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import MainTimer from "./MainTimer";
import ProgressBar from "./ProgressBar";
import SetTimer from "./SetTimer";

const PomodoroAssembly = () => {
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
    </>
  );
};

export default PomodoroAssembly;

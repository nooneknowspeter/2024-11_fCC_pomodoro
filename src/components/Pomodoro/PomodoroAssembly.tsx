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
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            console.log("timer run out");
            switch (activeTimer) {
              case "Session":
                setActiveTimer("Break");
                setMinutes(breakTime);
                setSeconds(0);
                break;
              case "Break":
                setActiveTimer("Session");
                setMinutes(sessionTime);
                setSeconds(0);
                break;

              default:
                break;
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
    setMinutes(25);
    setSeconds(0);
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
    console.log("options", options);
  };

  const setBreakTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonID = e.currentTarget.id;

    switch (buttonID) {
      case "break-increment":
        console.log("count increase");

        setActiveTimer("Break");

        !isRunning && breakTime < 60 && setBreakTime(breakTime + 1);
        !isRunning && breakTime < 60 && setMinutes(breakTime + 1);
        !isRunning && setSeconds(0);

        break;
      case "break-decrement":
        console.log("count decrease");

        setActiveTimer("Break");

        !isRunning && breakTime > 1 && setBreakTime(breakTime - 1);
        !isRunning && breakTime > 1 && setMinutes(breakTime - 1);
        !isRunning && setSeconds(0);

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

        setActiveTimer("Session");

        !isRunning && sessionTime < 60 && setSessionTime(sessionTime + 1);
        !isRunning && sessionTime < 60 && setMinutes(sessionTime + 1);
        !isRunning && setSeconds(0);

        break;
      case "session-decrement":
        console.log("count decrease");

        setActiveTimer("Session");

        !isRunning && sessionTime > 1 && setSessionTime(sessionTime - 1);
        !isRunning && sessionTime > 1 && setMinutes(sessionTime - 1);
        !isRunning && setSeconds(0);

        break;
      default:
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
          progressBar={
            isRunning && (
              <ProgressBar progressColor={`bg-neutral-50`} status={`50`} />
            )
          }
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
      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </>
  );
};

export default PomodoroAssembly;

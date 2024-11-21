import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import MainTimer from "./MainTimer";
import ProgressBar from "./ProgressBar";
import SetTimer from "./SetTimer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PomodoroAssembly = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const container = useRef(null);
  const setBreakTimerRef = useRef(null);
  const setSessionTimerRef = useRef(null);

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
    let breakTimeInSeconds = breakTime * 60;
    let sessionTimeInSeconds = sessionTime * 60;
    let totalSeconds = minutes * 60 + seconds;
    while (isRunning) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          console.log(
            activeTimer == "Session"
              ? (
                  (sessionTimeInSeconds - totalSeconds) /
                  sessionTimeInSeconds
                ).toFixed(1)
              : (
                  (breakTimeInSeconds - totalSeconds) /
                  breakTimeInSeconds
                ).toFixed(1),
          );

          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            console.log("timer run out");
            audioRef.current.play();
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

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const settings = () => {
    console.log("settings");

    switch (options) {
      case true:
        console.log("off");

        setOptions(false);
        break;
      case false:
        console.log("on");

        setOptions(true);

        break;

      default:
        break;
    }
  };

  const setBreakTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonID = e.currentTarget.id;

    switch (buttonID) {
      case "break-increment":
        console.log("count increase");

        !isRunning && setActiveTimer("Break");

        !isRunning && breakTime < 60 && setBreakTime(breakTime + 1);
        !isRunning && breakTime < 60 && setMinutes(breakTime + 1);
        !isRunning && setSeconds(0);

        break;
      case "break-decrement":
        console.log("count decrease");

        !isRunning && setActiveTimer("Break");

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

  return (
    <>
      <div
        id="pomodoro-assembly"
        className="relative flex h-screen select-none flex-col place-content-center items-center justify-center gap-12 overflow-x-hidden p-9 text-center text-xl text-neutral-50 sm:flex-col md:flex-row"
        ref={container}
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
            <ProgressBar
              opacity={isRunning ? "animate-pulse scale-x-100" : " scale-x-0"}
            />
          }
        />

        <>
          {/* set break timer */}

          <SetTimer
            id="break"
            displayTime={breakTime}
            onClickDecrement={setBreakTimer}
            onClickIncrement={setBreakTimer}
            order={`order-first`}
            ref={setBreakTimerRef}
            opacity={options ? "opacity-100" : "opacity-0"}
          />
          {/* set session timer */}

          <SetTimer
            id="session"
            displayTime={sessionTime}
            onClickDecrement={setSessionTimer}
            onClickIncrement={setSessionTimer}
            order={`order-last`}
            ref={setSessionTimerRef}
            opacity={options ? "opacity-100" : "opacity-0"}
          />
        </>
      </div>
      <audio
        id="beep"
        src="/src/assets/dusk-oneshot-ectoplasm.wav"
        ref={audioRef}
      ></audio>
    </>
  );
};

export default PomodoroAssembly;

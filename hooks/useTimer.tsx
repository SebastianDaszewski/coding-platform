import { useState, useEffect } from "react";

const useTimer = (initialMinutes: any) => {
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState("");

  useEffect(() => {
    let interval: any;

    if (isRunning === "stopper") {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startAndStop = (value: string) => {
    if (value === "countdown") {
      setIsRunning((prev) => (prev === "countdown" ? "" : "countdown"));
    } else if (value === "stopper") {
      setIsRunning((prev) => (prev === "stopper" ? "" : "stopper"));
    }
  };

  const reset = (value: string) => {
    setIsRunning("");
    if (value === "stopper") {
      setTime(0);
    } else if (value === "countdown") {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
    } else if (value === "") {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
      setTime(0);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRunning === "countdown") {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        }
      }, 10);
    }

    if (minutes === 0 && seconds === 0 && milliseconds === 1) {
      reset("countdown");
      setIsRunning("");
      setMilliseconds(0);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  useEffect(() => {
    if (initialMinutes == "" || initialMinutes < 0) {
      setMinutes(0);
      setSeconds(0);
    } else if (initialMinutes < 0.1) {
      setMinutes(0);
      setSeconds(0);
    } else if (initialMinutes > 59) {
      setMinutes(59);
      setSeconds(0);
    } else if (initialMinutes < 1) {
      const totalSeconds = parseFloat(initialMinutes) * 60;
      setMinutes(Math.floor(totalSeconds / 60));
      setSeconds(totalSeconds % 60);
    } else {
      setMinutes(initialMinutes);
    }
  }, [initialMinutes]);

  return {
    time,
    isRunning,
    startAndStop,
    reset,
    minutes,
    seconds,
    milliseconds,
  };
};

export default useTimer;

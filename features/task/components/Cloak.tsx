"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";

import CloakIcon from "@/icons/CloakIcon";
import useTimer from "@/hooks/useTimer";
import Button from "@/components/Button";

const Cloak = () => {
  const t = useTranslations("task");
  const [isCloakOpened, setIsCloakOpened] = useState(false);
  const [isClicked, setIsClicked] = useState("first");
  const [inputMinutes, setInputMinutes] = useState("0");
  const {
    time,
    isRunning,
    startAndStop,
    reset,
    minutes,
    seconds,
    milliseconds,
  } = useTimer(inputMinutes);

  const handleClickOutside = (event: any) => {
    if (!event.target.closest("#cloak")) {
      setIsCloakOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: any) => {
    reset("countdown");
    setInputMinutes(event.target.value);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && isClicked === "first") {
      startAndStop("stopper");
    } else if (
      document.visibilityState === "visible" &&
      isClicked === "second"
    ) {
      startAndStop("countdown");
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
  };

  const formatTimeStopper = (
    time: number,
    includeMilliseconds = true,
    includeSeconds = true
  ) => {
    let formattedTime = "";

    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    formattedTime += `${minutes}:`;

    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    formattedTime += `${seconds}`;

    if (includeMilliseconds) {
      const centiseconds = ("0" + Math.floor((time / 10) % 100)).slice(-2);
      if (includeSeconds) {
        formattedTime += `:${centiseconds}`;
      } else {
        formattedTime += `${centiseconds}`;
      }
    }

    return formattedTime;
  };

  const formatTimeCountdown = (
    minutes: number,
    seconds: number,
    milliseconds: number,
    includeMilliseconds = true
  ) => {
    let formattedTime = "";

    const formattedMinutes = ("0" + Math.floor(minutes % 60)).slice(-2);
    formattedTime += `${formattedMinutes}:`;

    const formattedSeconds = ("0" + Math.floor(seconds % 60)).slice(-2);
    formattedTime += `${formattedSeconds}`;
    if (includeMilliseconds) {
      const formattedMilliseconds = (
        "0" + Math.floor(milliseconds % 1000)
      ).slice(-2);
      formattedTime += `:${formattedMilliseconds}`;
    }

    return formattedTime;
  };

  return (
    <div id="cloak">
      <Button
        onClick={() => setIsCloakOpened((prev) => !prev)}
        className={clsx(
          "text-white bg-midLightBlue flex h-10 w-35 items-center justify-center",
          {
            "bg-blue shadow-taskWindowShadow": isCloakOpened,
            "bg-green": isRunning === "stopper" || isRunning === "countdown",
          }
        )}
        content={
          <div className="flex items-center justify-between transform transition-transform duration-300 hover:scale-120 gap-5">
            <div className="flex">
              <CloakIcon />
            </div>
            <div className="flex">
              <span className={clsx({ hidden: isClicked === "second" })}>
                {formatTimeStopper(time, false, false)}
              </span>
              <span className={clsx({ hidden: isClicked === "first" })}>
                {formatTimeCountdown(minutes, seconds, milliseconds, false)}
              </span>
            </div>
          </div>
        }
      />
      <div
        className={clsx(
          "absolute border-black shadow-sampleWindowShadow rounded-md z-50 mt-2",
          {
            hidden: !isCloakOpened,
          }
        )}
      >
        <div className="flex">
          <Button
            disabled={isRunning === "countdown"}
            onClick={() => setIsClicked("first")}
            className={clsx(
              "text-white text-3/4.5 bg-blue flex h-10 w-37.5 justify-center items-center rounded-tl-md disabled:bg-gray-700",
              {
                "bg-blue shadow-taskWindowShadow": isClicked === "first",
                "bg-midLightBlue": isClicked === "second",
              }
            )}
            content={t("stopper")}
          />
          <Button
            disabled={isRunning === "stopper"}
            onClick={() => setIsClicked("second")}
            className={clsx(
              "text-white text-3/4.5 flex h-10 w-37.5 justify-center gap-4 items-center rounded-tr-md disabled:bg-gray-700",
              {
                "bg-blue shadow-taskWindowShadow": isClicked === "second",
                "bg-midLightBlue": isClicked === "first",
              }
            )}
            content={t("countdown")}
          />
        </div>
        <div
          className={clsx({
            hidden: isClicked !== "first",
          })}
        >
          <div
            className={clsx(
              "w-75 bg-customGray p-3 rounded-b-md text-white text-4xl/13.5 h-20",
              {
                "shadow-taskWindowShadow": isClicked === "second",
              }
            )}
          >
            {formatTimeStopper(time)}
          </div>

          <div className="w-full p-3 flex bg-customGray">
            <Button
              onClick={() => {
                startAndStop("stopper");
              }}
              className="bg-orange text-white rounded-md h-10 w-full mr-2"
              content={isRunning === "stopper" ? "Stop" : "Start"}
            />
            <Button
              onClick={() => {
                reset("stopper");
              }}
              className="bg-orange text-white rounded-md h-10 w-full ml-2"
              content="Reset"
            />
          </div>
        </div>
        <div>
          <div
            className={clsx({
              hidden: isClicked === "first",
            })}
          >
            <div
              className={
                "w-75 bg-customGray p-3 rounded-b-md text-white text-4xl/13.5 h-40"
              }
            >
              {formatTimeCountdown(minutes, seconds, milliseconds)}
              <div className="mt-4">
                <div className="text-white text-sm">{t("minutes")}</div>
                <input
                  disabled={isRunning === "countdown"}
                  type="number"
                  value={inputMinutes}
                  onChange={handleInputChange}
                  onClick={() => {
                    reset("countdown");
                    setInputMinutes("0");
                  }}
                  className="h-10 bg-inputGray rounded-md border-inputBorderGray w-full text-white"
                />
              </div>
            </div>

            <div className="w-full p-3 flex bg-customGray">
              <Button
                disabled={inputMinutes == "0"}
                onClick={() => startAndStop("countdown")}
                className="bg-orange text-white rounded-md h-10 w-full mr-2"
                content={isRunning === "countdown" ? "Stop" : "Start"}
              />
              <Button
                onClick={() => {
                  reset("countdown");
                  setInputMinutes("0");
                }}
                className="bg-orange text-white rounded-md h-10 w-full ml-2"
                content="Reset"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cloak;

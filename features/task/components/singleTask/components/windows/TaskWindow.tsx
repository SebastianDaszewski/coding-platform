"use client";

import clsx from "clsx";
import { useState } from "react";

import { useEditorAndQuickTestContext } from "@/context/EditorAndQuickTestContext";
import { Button } from "@/components";

type TaskWindowProps = {
  children: any;
  secondContent?: any;
  firstButton: string;
  secondButton?: string;
  shouldShow: boolean;
  borderColorRed?: boolean;
  borderColorGreen?: boolean;
};
const TaskWindow: React.FC<TaskWindowProps> = ({
  children,
  secondContent,
  firstButton,
  secondButton,
  shouldShow,
  borderColorRed,
  borderColorGreen,
}) => {
  const [isClicked, setIsClicked] = useState("first");
  const { setQuickTest } = useEditorAndQuickTestContext();

  const handleClick = () => {
    setIsClicked("first");
    setQuickTest("");
  };

  return (
    <>
      <div className="h-full">
        <div className="bg-customLightGray flex rounded-t-md">
          <Button
            onClick={handleClick}
            className={clsx(
              "text-white text-3/4.5 bg-blue flex h-10 w-29.25 justify-center items-center rounded-tl-md",
              {
                "bg-blue shadow-taskWindowShadow": isClicked === "first",
                "bg-midLightBlue": isClicked === "second",
              }
            )}
            content={firstButton}
          />
          <Button
            onClick={() => setIsClicked("second")}
            className={clsx(
              "text-white text-3/4.5 flex h-10 w-29.25 justify-center gap-4 items-center",
              {
                "bg-blue shadow-taskWindowShadow": isClicked === "second",
                "bg-midLightBlue": isClicked === "first",
                hidden: !shouldShow,
              }
            )}
            content={secondButton}
          />
        </div>
        <div
          className={clsx(
            "flex text-3/4.5 p-4 bg-customGray rounded-b-md h-full overflow-auto",
            {
              "border-red border": borderColorRed,
              "border-green border": borderColorGreen,
            }
          )}
        >
          <div className="text-white h-5 w-full">
            {isClicked === "first" ? children : secondContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskWindow;

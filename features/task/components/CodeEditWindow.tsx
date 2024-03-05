"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import React, { useState } from "react";

import { RunCodeIcon, SendCodeIcon } from "@/icons";
import Button from "@/components/Button";

import MonacoEditor from "./MonacoEditor";

type CodeEditWindowProps = {
  firstButton: string;
  onCodeExecutionStatusChange: any;
};

const CodeEditWindow: React.FC<CodeEditWindowProps> = ({
  onCodeExecutionStatusChange,
  firstButton,
}) => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const t = useTranslations("task");

  const showValue = () => {
    onCodeExecutionStatusChange(true);
  };

  return (
    <>
      {formSubmitted && (
        <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
          <div
            className={clsx("relative rounded-lg border", {
              "border-green": isSuccess,
              "border-red": !isSuccess,
            })}
          >
            <div className="flex items-center justify-center">
              <div className="p-7 gap-12 w-175 h-1/5 rounded-lg text-white flex flex-col items-center justify-start shadow-custom bg-customGray">
                <span
                  className={clsx("font-extralight text-2xl/9", {
                    "text-green": isSuccess,
                    "text-red": !isSuccess,
                  })}
                >
                  {t("successedOrNot", {
                    solution: isSuccess,
                  })}
                </span>
                <span
                  className={clsx("-mb-3 font-medium text-sm/5.25", {
                    "text-green": isSuccess,
                    "text-red": !isSuccess,
                  })}
                >
                  {t("correctOrIncorrect", {
                    solution: isSuccess,
                  })}
                </span>

                <Button
                  onClick={() => setFormSubmitted(false)}
                  className={clsx(
                    "h-10 w-76.25 text-base font-medium text-white rounded-lg text-center",
                    {
                      "bg-green": isSuccess,
                      "bg-red": !isSuccess,
                    }
                  )}
                  content={t("continueOrBack", {
                    solution: isSuccess,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-customLightGray rounded-t-md">
        <Button
          className="text-white text-3/4.5 bg-blue shadow-taskWindowShadow h-10 w-29.25 justify-center items-center rounded-tl-md"
          content={firstButton}
        />
      </div>
      <div className="h-full transition-none">
        <MonacoEditor
          quickSuggestions={{
            other: true,
            comments: true,
            strings: true,
          }}
          setEditorValue={setEditorValue}
        />
      </div>

      <div className="bg-customLightGray h-15 rounded-b-md flex items-center justify-center gap-x-4 p-4 mb-5">
        <Button
          onClick={showValue}
          className="text-white bg-green h-10 rounded-md w-full flex items-center justify-center"
          content={
            <>
              <p className="mr-2">{t("runCode")}</p>
              <RunCodeIcon fill="white" />
            </>
          }
        />
        <Button
          onClick={() => setFormSubmitted(true)}
          className="text-white bg-blue h-10 rounded-md w-full flex items-center justify-center"
          content={
            <>
              <p className="mr-2">{t("sendCode")}</p>
              <SendCodeIcon fill="white" />
            </>
          }
        />
      </div>

      {formSubmitted && (
        <div
          onClick={() => setFormSubmitted(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default CodeEditWindow;

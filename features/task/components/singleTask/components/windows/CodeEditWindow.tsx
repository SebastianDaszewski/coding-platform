"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { RunCodeIcon, SendCodeIcon } from "@/icons";
import { Button } from "@/components";
import { useEditorAndQuickTestContext } from "@/context/EditorAndQuickTestContext";
import { white } from "@/styles/colors";

import MonacoEditor from "../MonacoEditor";

type CodeEditWindowProps = {
  firstButton: string;
  onCodeExecutionStatusChange: any;
  handleRunCodeFullTests: any;
  isSuccess: boolean;
  formSubmitted: boolean;
  setFormSubmitted: any;
  refetch: () => void;
};

const CodeEditWindow: React.FC<CodeEditWindowProps> = ({
  onCodeExecutionStatusChange,
  firstButton,
  handleRunCodeFullTests,
  isSuccess,
  formSubmitted,
  setFormSubmitted,
  refetch,
}) => {
  const t = useTranslations("task");
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const { setSolution } = useEditorAndQuickTestContext();

  useEffect(() => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      setSolution(value || "");
    }
  }, [setSolution]);

  const handleModelChange = (value: any) => {
    onCodeExecutionStatusChange(false);
    setSolution(value || "");
  };

  const showValue = () => {
    onCodeExecutionStatusChange(true);
  };

  const handleCloseModal = () => {
    refetch();
    if (isSuccess) {
      router.push("/task");
    } else {
      setFormSubmitted(false);
    }
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
                  onClick={handleCloseModal}
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
          onChange={handleModelChange}
          quickSuggestions={{
            other: true,
            comments: true,
            strings: true,
          }}
        />
      </div>

      <div className="bg-customLightGray h-15 rounded-b-md flex items-center justify-center gap-x-4 p-4 mb-5">
        <Button
          onClick={showValue}
          className="text-white bg-green h-10 rounded-md w-full flex items-center justify-center"
          content={
            <>
              <p className="mr-2">{t("runCode")}</p>
              <RunCodeIcon fill={white} />
            </>
          }
        />
        <Button
          onClick={() => {
            handleRunCodeFullTests();
          }}
          className="text-white bg-blue h-10 rounded-md w-full flex items-center justify-center"
          content={
            <>
              <p className="mr-2">{t("sendCode")}</p>
              <SendCodeIcon fill={white} />
            </>
          }
        />
      </div>
      {formSubmitted && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-40 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default CodeEditWindow;

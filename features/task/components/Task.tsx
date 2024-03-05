"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { useEditorContext } from "@/context/EditorContext";
import SignInLayout from "@/features/signInLayout/layout";

import CodeEditWindow from "./CodeEditWindow";
import ConsoleWindow from "./ConsoleWindow";
import Navbar from "./Navbar";
import FirstTaskWindowContent from "./FirstTaskWindowContent";
import SecondTaskWindowContent from "./SecondTaskWindowContent";
import ThirdTaskWindowContent from "./ThirdTaskWindowContent";

const Task = () => {
  const t = useTranslations("task");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCodeExecuted, setIsCodeExecuted] = useState(false);
  const [modifiedEditorValue, setModifiedEditorValue] = useState("");
  const { editorCode } = useEditorContext();
  const [shouldShowResultTest, setShouldShowResultTest] = useState("");

  const handleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/RunCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: editorCode }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result, "result");
        let modifiedValue = result
          .map((item: any) => item.message.replace(/[\[\]]/g, ""))
          .join("\n");
        setModifiedEditorValue(modifiedValue);
        if (modifiedValue.startsWith("[")) {
          modifiedValue = modifiedValue.slice(1, -1);
          setModifiedEditorValue(modifiedValue);
        }
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error during fetch:", error.message);
    }
  };

  useEffect(() => {
    if (isCodeExecuted) {
      handleRunCode();
    }
  }, [isCodeExecuted, editorCode, setModifiedEditorValue]);

  useEffect(() => {
    setIsCodeExecuted(false);
  }, [editorCode]);

  return (
    <div className="bg-black w-screen">
      <SignInLayout>
        <div className="flex flex-col w-full p-5">
          <Navbar handleFullscreen={handleFullscreen} />
          <div className="w-full flex h-sidebarHeight gap-5 mt-5">
            <div
              className={clsx("flex flex-col w-1/3 mb-10 space-y-15", {
                hidden: isFullscreen,
              })}
            >
              <div className="flex-grow">
                <FirstTaskWindowContent />
              </div>
              <div className="flex-grow">
                <SecondTaskWindowContent
                  shouldShow={(value) => setShouldShowResultTest(value)}
                />
              </div>
              <div className="flex-grow">
                <ThirdTaskWindowContent
                  shouldShowResultTest={shouldShowResultTest}
                />
              </div>
            </div>
            <div
              className={clsx("flex flex-col w-2/3 transition-all", {
                "w-full": isFullscreen,
              })}
            >
              <CodeEditWindow
                onCodeExecutionStatusChange={(isCodeExecuted: any) => {
                  setIsCodeExecuted(isCodeExecuted);
                }}
                firstButton={t("console")}
              />
              <ConsoleWindow
                content={isCodeExecuted ? modifiedEditorValue : ""}
                firstButton={t("console")}
              />
            </div>
          </div>
        </div>
      </SignInLayout>
    </div>
  );
};

export default Task;

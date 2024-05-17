"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useEffect } from "react";

import { Button } from "@/components";
import { useEditorAndQuickTestContext } from "@/context/EditorAndQuickTestContext";

import TaskWindow from "./TaskWindow";
import TestCase from "../testResult/TestCase";
import MonacoEditor from "../MonacoEditor";

type SecondTaskWindowContentProps = {
  shouldShow: (value: string) => void;
  tests?: any;
  runQuickFunction: () => void;
  runFullFunction: any;
};

const SecondTaskWindowContent: React.FC<SecondTaskWindowContentProps> = ({
  shouldShow,
  tests,
  runQuickFunction,
  runFullFunction,
}) => {
  const editorRef = useRef<any>(null);
  const { solution, setQuickTest, quickTest } = useEditorAndQuickTestContext();

  const t = useTranslations("task");

  useEffect(() => {
    shouldShow("");
  }, [solution, quickTest]);

  useEffect(() => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      setQuickTest(value || "");
    }
  }, [setQuickTest]);

  const handleModelChange = (value: any) => {
    setQuickTest(value || "");
  };

  const handleClickQuick = () => {
    runQuickFunction();
    shouldShow("quick");
  };

  const handleClickFull = () => {
    runFullFunction(false);
    shouldShow("full");
  };

  return (
    <TaskWindow
      secondContent={
        <div className="py-5 px-3">
          <Button
            onClick={() => handleClickQuick()}
            className="text-black bg-orange h-10 rounded-md w-full flex items-center mb-5"
            content={
              <p className="mr-2 text-base font-medium w-full">
                {t("letsFastTest")}
              </p>
            }
          />
          <p className="text-3/4.5 font-medium mt-5">{t("value")}</p>
          <div className="border border-grey rounded-md shadow-sampleWindowShadow">
            <MonacoEditor
              onChange={handleModelChange}
              variant="testEditor"
              quickSuggestions={{
                other: false,
                comments: false,
                strings: false,
              }}
            />
          </div>
        </div>
      }
      firstButton={t("test")}
      secondButton={t("fastTest")}
      shouldShow={true}
    >
      <div className="py-5 px-3">
        <Button
          onClick={() => handleClickFull()}
          className="text-black bg-orange h-10 rounded-md w-full flex items-center"
          content={
            <p className="mr-2 text-base font-medium w-full">{t("letsTest")}</p>
          }
        />
        <TestCase tests={tests} />
      </div>
    </TaskWindow>
  );
};

export default SecondTaskWindowContent;

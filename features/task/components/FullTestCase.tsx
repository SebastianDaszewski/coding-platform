"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import VectorDownIcon from "@/icons/VectorDownIcon";
import VectorUpIcon from "@/icons/VectorUpIcon";

import MonacoEditor from "./MonacoEditor";

type FullTestCaseProps = {
  title: string;
  testCase: string;
  borderColor: boolean;
};
const FullTestCase: React.FC<FullTestCaseProps> = ({
  title,
  testCase,
  borderColor,
}) => {
  const [fullView, setFullView] = useState(false);

  const t = useTranslations("task");
  const testsCaseSections = ["expectedResult", "yourResult", "enteredValue"];
  const { expectedResult, inputData, yourResult } = JSON.parse(testCase);

  const handleFullView = () => {
    setFullView(!fullView);
  };

  const pickCode = (sectionName: string) => {
    let code;
    switch (sectionName) {
      case "expectedResult":
        code = expectedResult;
        break;
      case "yourResult":
        code = yourResult;
        break;
      case "enteredValue":
        code = inputData;
        break;
    }
    return code;
  };

  return (
    <>
      <div className="w-full h-8 rounded-t-md">
        <div
          className={clsx(
            "relative top-2 w-full bg-customLightGray h-8 flex justify-between items-center px-3 border rounded-md",
            {
              "border-green": borderColor,
              "border-red": !borderColor,
            }
          )}
        >
          <p>{title}</p>
          <div className="h-full flex items-center" onClick={handleFullView}>
            {!fullView ? <VectorDownIcon /> : <VectorUpIcon />}
          </div>
        </div>
      </div>
      {fullView && (
        <div
          className={clsx(
            "w-full bg-customLightGray flex flex-col px-3 rounded-b-md py-5 border-x border-b",
            {
              "border-green": borderColor,
              "border-red": !borderColor,
            }
          )}
        >
          {testsCaseSections.map((sectionName, index) => (
            <div key={index}>
              <p>{t(sectionName)}</p>
              <div className="border border-grey rounded-md shadow-sampleWindowShadow mb-3">
                <MonacoEditor
                  quickSuggestions={false}
                  variant="testValue"
                  editorValue={pickCode(sectionName)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FullTestCase;

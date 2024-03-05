"use client";

import { useTranslations } from "next-intl";

import { TESTS_CASES } from "@/mock/tests";

import MonacoEditor from "./MonacoEditor";

const TestCase = () => {
  const t = useTranslations("task");

  return (
    <>
      {TESTS_CASES.map(({ inputData }, index) => (
        <div key={index}>
          <p className="text-3/4.5 font-medium mt-5">
            {t("testCaseNumber", {
              number: index + 1,
            })}
          </p>
          <div className="border border-grey rounded-md shadow-sampleWindowShadow">
            <MonacoEditor
              value={inputData}
              quickSuggestions={false}
              variant="testValue"
              editorValue={inputData}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TestCase;

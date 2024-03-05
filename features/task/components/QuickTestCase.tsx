"use client";

import { useTranslations } from "next-intl";

import { QUICK_TEST_RESULT } from "@/mock/tests";
import MonacoEditor from "./MonacoEditor";
import { CheckIcon, FailedIcon } from "@/icons";

const QuickTestCase = () => {
  const t = useTranslations("task");

  const {
    expectedResult,
    yourResult,
    passed: isTestSuccessful,
  } = QUICK_TEST_RESULT;
  const quickTestsSections = ["expectedResult", "yourResult"];

  const pickCode = (sectionName: string) => {
    let code;
    switch (sectionName) {
      case "expectedResult":
        code = expectedResult;
        break;
      case "yourResult":
        code = yourResult;
        break;
    }
    return code;
  };

  return (
    <>
      <div className="space-y-4 pb-4">
        <div>
          <div className="flex items-center gap-5">
            {t("quickTestPassedOrFailed", {
              solution: isTestSuccessful,
            })}
            {isTestSuccessful ? <CheckIcon /> : <FailedIcon />}
          </div>
        </div>
        {quickTestsSections.map((section) => (
          <div key={section}>
            <p>{t(section)}</p>
            <div className="border border-grey rounded-md shadow-sampleWindowShadow">
              <MonacoEditor
                quickSuggestions={false}
                variant="testValue"
                editorValue={pickCode(section)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuickTestCase;

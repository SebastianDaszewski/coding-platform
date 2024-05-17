"use client";

import { useTranslations } from "next-intl";

import { CheckIcon, FailedIcon } from "@/icons";

import MonacoEditor from "../MonacoEditor";

type QuickTestCaseProps = {
  quickCodeOutcome?: never[];
  quickTestOutcome?: any;
  quickExpectedResult?: any;
};
const QuickTestCase: React.FC<QuickTestCaseProps> = ({
  quickCodeOutcome,
  quickTestOutcome,
  quickExpectedResult,
}) => {
  const t = useTranslations("task");

  const quickTestsSections = ["expectedResult", "yourResult"];
  const pickCode = (sectionName: string) => {
    let code;
    switch (sectionName) {
      case "expectedResult":
        code = quickExpectedResult;
        break;
      case "yourResult":
        code = quickCodeOutcome;
        break;
    }
    return code.toString();
  };

  return (
    <div className="space-y-4 pb-4">
      <div>
        <div className="flex items-center gap-5">
          {t("quickTestPassedOrFailed", {
            solution: quickTestOutcome,
          })}
          {quickTestOutcome ? (
            <CheckIcon fill="none" stroke="green" scale={false} size="24" />
          ) : (
            <FailedIcon />
          )}
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
  );
};

export default QuickTestCase;

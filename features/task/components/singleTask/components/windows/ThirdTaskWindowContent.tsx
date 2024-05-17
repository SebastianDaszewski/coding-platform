"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

import { CheckIcon, FailedIcon } from "@/icons";

import FullTestCase from "../testResult/FullTestCase";
import TaskWindow from "./TaskWindow";
import QuickTestCase from "../testResult/QuickTestCase";

type ThirdTaskWindowContentProps = {
  shouldShowResultTest: string;
  middleTestsResult: any;
  quickExpectedResult: any;
  quickTestOutcome: boolean;
  quickCodeOutcome: never[];
};
const ThirdTaskWindowContent: React.FC<ThirdTaskWindowContentProps> = ({
  shouldShowResultTest,
  middleTestsResult,
  quickExpectedResult,
  quickTestOutcome,
  quickCodeOutcome,
}) => {
  const t = useTranslations("task");

  type TestResult = {
    input: string;
    expectedResult: string;
    codeOutcome: string;
    testOutcome: boolean;
  };

  const isTestsSuccessful = middleTestsResult?.every(
    ({ testOutcome }: TestResult) => testOutcome
  );

  const handleNumberOfPassedTest = middleTestsResult?.filter(
    ({ testOutcome }: TestResult) => testOutcome
  ).length;

  const checkMiddleTest = middleTestsResult.some(
    (e: any) => e.codeOutcome !== null
  );

  const shouldDisplayQuickTest = () => {
    const areResultsAvailable =
      quickExpectedResult[0] !== null && quickExpectedResult[0] !== undefined;
    return areResultsAvailable;
  };

  const shouldDisplayOutcome = () => {
    const areOutcomeAvailable =
      quickCodeOutcome[0] !== null && quickCodeOutcome[0] !== undefined;
    return areOutcomeAvailable;
  };
  return (
    <TaskWindow
      firstButton={t("result")}
      shouldShow={false}
      borderColorGreen={shouldShowResultTest === "quick" && quickTestOutcome}
      borderColorRed={
        shouldShowResultTest === "quick" &&
        !quickTestOutcome &&
        shouldDisplayOutcome()
      }
    >
      {shouldShowResultTest === "quick" && shouldDisplayOutcome() && (
        <QuickTestCase
          quickCodeOutcome={quickCodeOutcome}
          quickTestOutcome={quickTestOutcome}
          quickExpectedResult={
            shouldDisplayQuickTest() ? quickExpectedResult : ""
          }
        />
      )}
      {shouldShowResultTest === "full" && checkMiddleTest && (
        <>
          <div className="flex justify-between text-xs font-medium">
            <div>
              <div className="flex items-center gap-5">
                {t("passedAllOrNot", {
                  solution: isTestsSuccessful,
                })}
                {isTestsSuccessful ? (
                  <CheckIcon fill="none" size="24" stroke="green" />
                ) : (
                  <FailedIcon />
                )}
              </div>
            </div>
            <p
              className={clsx({
                "text-green": isTestsSuccessful,
                "text-red": !isTestsSuccessful,
              })}
            >
              {handleNumberOfPassedTest} / {middleTestsResult.length}
            </p>
          </div>
          {middleTestsResult.map((testCase: any, index: number) => (
            <div key={index} className="mb-5 mt-2">
              <FullTestCase
                key={index}
                testCase={JSON.stringify(testCase)}
                borderColor={testCase.testOutcome}
                title={t(`testCaseNumber`, {
                  number: index + 1,
                })}
              />
            </div>
          ))}
        </>
      )}
    </TaskWindow>
  );
};

export default ThirdTaskWindowContent;

"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

import { TESTS_CASES } from "@/mock/tests";
import { CheckIcon, FailedIcon } from "@/icons";
import { QUICK_TEST_RESULT } from "@/mock/tests";

import FullTestCase from "./FullTestCase";
import TaskWindow from "./TaskWindow";
import QuickTestCase from "./QuickTestCase";

type ThirdTaskWindowContentProps = { shouldShowResultTest: string };
const ThirdTaskWindowContent: React.FC<ThirdTaskWindowContentProps> = ({
  shouldShowResultTest,
}) => {
  const t = useTranslations("task");

  const isTestsSuccessful = TESTS_CASES.every(({ passed }) => passed);

  const handleNumberOfPassedTest = TESTS_CASES.filter(
    ({ passed }) => passed
  ).length;

  const { passed: isTestSuccessful } = QUICK_TEST_RESULT;

  return (
    <TaskWindow
      firstButton={t("result")}
      shouldShow={false}
      borderColorGreen={shouldShowResultTest === "quick" && isTestSuccessful}
      borderColorRed={shouldShowResultTest === "quick" && !isTestSuccessful}
    >
      {(shouldShowResultTest === "quick" && <QuickTestCase />) ||
        (shouldShowResultTest === "full" && (
          <>
            <div className="flex justify-between text-xs font-medium">
              <div>
                <div className="flex items-center gap-5">
                  {t("passedAllOrNot", {
                    solution: isTestsSuccessful,
                  })}
                  {isTestsSuccessful ? <CheckIcon /> : <FailedIcon />}
                </div>
              </div>
              <p
                className={clsx({
                  "text-green": isTestsSuccessful,
                  "text-red": !isTestsSuccessful,
                })}
              >
                {handleNumberOfPassedTest} / {TESTS_CASES.length}
              </p>
            </div>
            {TESTS_CASES.map((testCase, index) => (
              <div key={index} className="mb-5 mt-2">
                <FullTestCase
                  key={index}
                  testCase={JSON.stringify(testCase)}
                  borderColor={testCase.passed}
                  title={t(`testCaseNumber`, {
                    number: index + 1,
                  })}
                />
              </div>
            ))}
          </>
        ))}
    </TaskWindow>
  );
};
export default ThirdTaskWindowContent;

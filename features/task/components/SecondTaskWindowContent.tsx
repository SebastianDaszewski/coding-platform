"use client";

import { useTranslations } from "next-intl";

import Button from "@/components/Button";

import TaskWindow from "./TaskWindow";
import TestCase from "./TestCase";
import MonacoEditor from "./MonacoEditor";

type SecondTaskWindowContentProps = { shouldShow: (value: string) => void };

const SecondTaskWindowContent: React.FC<SecondTaskWindowContentProps> = ({
  shouldShow,
}) => {
  const t = useTranslations("task");

  return (
    <TaskWindow
      secondContent={
        <div className="py-5 px-3 h-69.5">
          <Button
            onClick={() => shouldShow("quick")}
            className="text-black bg-orange h-10 rounded-md w-full flex items-center mb-5"
            content={
              <p className="mr-2 text-base font-medium w-full">
                {t("letsFastTest")}
              </p>
            }
          />
          <div className="border border-grey rounded-md shadow-sampleWindowShadow">
            <MonacoEditor
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
          onClick={() => shouldShow("full")}
          className="text-black bg-orange h-10 rounded-md w-full flex items-center"
          content={
            <p className="mr-2 text-base font-medium w-full">{t("letsTest")}</p>
          }
        />
        <TestCase />
      </div>
    </TaskWindow>
  );
};

export default SecondTaskWindowContent;

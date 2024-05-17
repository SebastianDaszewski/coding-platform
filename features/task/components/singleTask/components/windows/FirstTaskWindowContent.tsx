"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { CheckBadge } from "@/icons";

import SampleInputAndOutput from "../SampleInputAndOutput";
import TaskWindow from "./TaskWindow";

type FirstTaskWindowContentProps = {
  taskData?: any;
  submissions?: any;
  dataSolutions: any;
};
const FirstTaskWindowContent: React.FC<FirstTaskWindowContentProps> = ({
  taskData,
  submissions,
  dataSolutions,
}) => {
  const t = useTranslations("task");
  const { data } = useSession();

  const ActiveUserId = (data as any)?.token?.sub;

  const checkSolutionFunction = () =>
    dataSolutions?.some(
      (e: any) =>
        e.userId === ActiveUserId &&
        e.javascriptAssignmentId === taskData?.id &&
        e.isCompleted === true
    );

  return (
    <TaskWindow firstButton={t("taskDescription")} shouldShow={false}>
      <div>
        {taskData && (
          <div className="flex flex-col">
            <div className="flex flex-wrap h-10">
              <div className="text-white">
                {t("categorySelect", {
                  category: taskData.category,
                })}
              </div>
              <div className="h-3 w-0.5 bg-white mt-1 mx-3"></div>
              <div className="text-white">
                {t("done", { done: submissions })}
              </div>
              <div className="h-3 w-0.5 bg-white mt-1 mx-3"></div>
              <div className="text-white">
                {t("difficultySelect", {
                  difficulty: taskData.difficultyLevel,
                })}
              </div>
            </div>
            <div className="text-white text-2xl flex my-3 h-7 items-center">
              {t(taskData.name)}
              {checkSolutionFunction() && (
                <div className="ml-5">
                  <CheckBadge fill="none" size="16" stroke="white" />
                </div>
              )}
            </div>
            <div className="text-white flex">{taskData.descriptionStart}</div>
            <div className="text-white flex">{taskData.descriptionEnd}</div>

            <div className="text-white flex">
              <SampleInputAndOutput
                data={taskData?.sampleInput}
                title={t("sampleInput")}
              />
            </div>
            <div className="text-white flex">
              <SampleInputAndOutput
                data={taskData?.sampleOutput}
                title={t("sampleOutput")}
              />
            </div>
          </div>
        )}
      </div>
    </TaskWindow>
  );
};

export default FirstTaskWindowContent;

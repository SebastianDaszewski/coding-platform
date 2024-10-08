"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SignInLayout from "@/features/signInLayout/layout";
import useFetchData from "@/hooks/useFetchData";
import { Button, Divider } from "@/components";
import { PlusIcon } from "@/icons";
import { white } from "@/styles/colors";

import ListElement from "./ListElement";
import PaginationBar from "./PaginationBar";

export type Task = {
  id: string;
  name: string;
  category: string;
  difficultyLevel: string;
  descriptionEnd: string;
  descriptionStart: string;
  sampleInput: string[];
  sampleOutput: string[];
  submissions?: number;
  tests: unknown[];
  solutions: {
    userId: string;
    solution: {
      isPassed: boolean;
    }[];
  }[];
};

const JsTasksList = () => {
  const t = useTranslations("list");
  const [limit, setLimit] = useState<number>(5);
  const { fetchTasks } = useFetchData();

  const dividerHeight = "h-3";

  const { data } = useQuery({
    queryKey: ["tasks", limit],
    queryFn: () => fetchTasks(limit),
  });

  return (
    <div className="w-screen bg-black">
      <SignInLayout>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full p-5 gap-5">
            <PaginationBar />
            <div className="bg-blue rounded-md w-full">
              <div className="flex items-center w-3/4 justify-between">
                <div className="text-white h-10 text-base font-bold flex ml-5 items-center w-10">
                  No.
                </div>
                <Divider width="0.5" height={dividerHeight} />
                <div className="text-white text-base font-bold flex ml-5 w-1/4">
                  {t("title")}
                </div>
                <Divider width="0.5" height={dividerHeight} />
                <div className="text-white text-base font-bold flex ml-5 w-1/4">
                  {t("category")}
                </div>
                <Divider width="0.5" height={dividerHeight} />
                <div className="text-white text-base font-bold flex ml-5 w-1/4">
                  {t("difficulty")}
                </div>
                <Divider width="0.5" height={dividerHeight} />
              </div>
              <div className="w-1/4"></div>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden h-taskListHeight px-5">
            {data?.assignments?.map((task: Task, index: number) => (
              <ListElement
                key={task.id}
                taskId={task.id}
                no={`${index + 1}.`}
                title={t(task.name)}
                category={t("categorySelect", {
                  category: task.category,
                })}
                difficulty={t("difficultySelect", {
                  difficulty: task.difficultyLevel,
                })}
                dataSolutions={data?.solutions}
              />
            ))}
          </div>
          <div className="flex justify-center mb-5 mt-2">
            <Button
              onClick={() => setLimit((prev) => prev + 1)}
              content={
                <>
                  <p>{t("moreTasks")}</p>
                  <PlusIcon fill={white} size="14" />
                </>
              }
              className="gap-2 w-60 h-10 bg-blue rounded-md flex items-center justify-center text-white text-base font-medium hover:bg-midLightBlue"
            />
          </div>
        </div>
      </SignInLayout>
    </div>
  );
};

export default JsTasksList;

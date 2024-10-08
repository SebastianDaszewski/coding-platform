"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { SnackbarProvider } from "notistack";
import { useQuery } from "@tanstack/react-query";

import SignInLayout from "@/features/signInLayout/layout";
import useFetchSingleTask from "@/hooks/useFetchSingleTask";
import useFetchData from "@/hooks/useFetchData";

import useTesting from "./useTesting";
import Navbar from "./components/Navbar";
import {
  FirstTaskWindowContent,
  SecondTaskWindowContent,
  ThirdTaskWindowContent,
  ConsoleWindow,
  CodeEditWindow,
} from "./components/windows/index";

const Task = () => {
  const t = useTranslations("task");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCodeExecuted, setIsCodeExecuted] = useState(false);
  const [shouldShowResultTest, setShouldShowResultTest] = useState("");
  const [quickTestOutcome, setQuickTestOutcome] = useState(false);

  const { fetchTaskData } = useFetchSingleTask();
  const {
    handleRunCodeFullTests,
    handleRunCodeQuickTest,
    quickCodeOutcome,
    quickExpectedResult,
    middleTestsResult,
    isSuccess,
    setFormSubmitted,
    formSubmitted,
  } = useTesting();
  const { fetchTasks } = useFetchData();

  const { data } = useQuery({
    queryKey: ["tasks", 10],
    queryFn: () => fetchTasks(10),
  });

  const { data: task, refetch } = useQuery({
    queryKey: ["singleTask"],
    queryFn: () => fetchTaskData(),
  });

  const handleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    if (quickCodeOutcome && quickExpectedResult) {
      if (
        JSON.stringify(quickCodeOutcome) ===
          JSON.stringify(quickExpectedResult) &&
        quickCodeOutcome[0] !== undefined &&
        quickCodeOutcome[0] !== null &&
        quickExpectedResult[0] !== undefined &&
        quickExpectedResult[0] !== null
      ) {
        setQuickTestOutcome(true);
      } else {
        setQuickTestOutcome(false);
      }
    }
  }, [quickExpectedResult, quickCodeOutcome]);

  return (
    <SnackbarProvider>
      <div className="bg-black w-screen overflow-hidden">
        <SignInLayout>
          <div className="flex flex-col w-full p-5">
            <Navbar
              allTasks={data?.assignments}
              currentTask={task?.assignment}
              handleFullscreen={handleFullscreen}
            />
            <div className="w-full flex h-sidebarHeight gap-5 mt-5">
              <div
                className={clsx(
                  "flex flex-col w-1/3 space-y-15 max-h-sidebarHeight mb-10",
                  {
                    hidden: isFullscreen,
                  }
                )}
              >
                <div className="h-1/3">
                  <FirstTaskWindowContent
                    dataSolutions={data?.solutions}
                    taskData={task?.assignment}
                    submissions={task?.assignment?.submissions}
                  />
                </div>
                <div className="h-1/3">
                  <SecondTaskWindowContent
                    runFullFunction={() =>
                      handleRunCodeFullTests(false, "test")
                    }
                    runQuickFunction={handleRunCodeQuickTest}
                    tests={task?.tests}
                    shouldShow={(value) => setShouldShowResultTest(value)}
                  />
                </div>
                <div className="h-1/3">
                  <ThirdTaskWindowContent
                    quickCodeOutcome={quickCodeOutcome}
                    quickTestOutcome={quickTestOutcome}
                    quickExpectedResult={quickExpectedResult}
                    shouldShowResultTest={shouldShowResultTest}
                    middleTestsResult={middleTestsResult}
                  />
                </div>
              </div>
              <div
                className={clsx("flex flex-col w-2/3 transition-all", {
                  "w-full": isFullscreen,
                })}
              >
                <CodeEditWindow
                  refetch={refetch}
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                  isSuccess={isSuccess}
                  handleRunCodeFullTests={() =>
                    handleRunCodeFullTests(true, "solution")
                  }
                  onCodeExecutionStatusChange={(isCodeExecuted: any) => {
                    setIsCodeExecuted(isCodeExecuted);
                  }}
                  firstButton={t("console")}
                />
                <ConsoleWindow
                  isCodeExecuted={isCodeExecuted}
                  firstButton={t("console")}
                />
              </div>
            </div>
          </div>
        </SignInLayout>
      </div>
    </SnackbarProvider>
  );
};

export default Task;

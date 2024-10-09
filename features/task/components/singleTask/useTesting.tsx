"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import useFetchSingleTask from "@/hooks/useFetchSingleTask";
import { useEditorAndQuickTestContext } from "@/context/EditorAndQuickTestContext";

const useTesting = () => {
  const t = useTranslations("task");
  const [fullCodeOutcome, setFullCodeOutcome] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quickCodeOutcome, setQuickCodeOutcome] = useState([]);
  const [quickExpectedResult, setQuickExpectedResult] = useState([]);
  const [fullTestsResult, setFullTestsResult] = useState<any[]>([]);
  const [middleTestsResult, setMiddleTestsResult] = useState<any[]>([]);

  const { solution, quickTest } = useEditorAndQuickTestContext();
  const { fetchTaskData } = useFetchSingleTask();
  const { data } = useSession();

  const ActiveUserId = (data as any)?.token?.sub;

  const { data: task } = useQuery({
    queryKey: ["singleTask"],
    queryFn: () => fetchTaskData(),
  });

  const inputs = task?.assignment?.tests.flatMap((e: any) => e.input);
  const fullExpectedResult = task?.assignment?.tests.flatMap(
    (e: any) => e.output
  );

  const handleRunCodeFullTests = async (
    shouldAnalyze: boolean,
    variant: string
  ) => {
    try {
      const url = window.location.href;
      const startIndex = url.indexOf("task/") + 5;
      const endIndex = url.indexOf("/", startIndex);
      const taskId = url.substring(startIndex, endIndex);

      let snackbarDisplayed = false;
      if (!solution || !solution.includes("function")) {
        enqueueSnackbar(t("enterFunction"), { variant: "error" });
        snackbarDisplayed = true;
        return;
      }
      const responseFullTests = await fetch("api/js-tasks/[...id]", {
        mode: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          solution: solution,
          variant: variant,
          inputs: inputs,
          expectedResult: fullExpectedResult,
          userId: ActiveUserId,
          taskId: taskId,
        }),
      });
      if (responseFullTests.ok) {
        const resultFullTests = await responseFullTests.json();
        if (variant === "test") {
          resultFullTests.map((e: any) => {
            if (e.codeOutcome.errorName && !snackbarDisplayed) {
              enqueueSnackbar(
                e.codeOutcome.errorName + ": " + e.codeOutcome.message,
                {
                  variant: "error",
                }
              );
              return (e.codeOutcome = null);
            }
          });
          setMiddleTestsResult(resultFullTests);
        } else {
          setFullCodeOutcome(
            resultFullTests.map((e: any) => {
              if (e.codeOutcome.errorName && !snackbarDisplayed) {
                enqueueSnackbar(
                  e.codeOutcome.errorName + ": " + e.codeOutcome.message,
                  {
                    variant: "error",
                  }
                );
                return null;
              } else {
                return e.codeOutcome.message;
              }
            })
          );
          setFullTestsResult(resultFullTests);
        }
        if (shouldAnalyze) {
          analyzeFullTest();
        }
      } else {
        console.error("Failed to fetch data:", responseFullTests.statusText);
      }
    } catch (error: any) {
      console.error("Error during fetch:", error.message);
    }
  };

  const analyzeFullTest = async () => {
    if (fullTestsResult) {
      setFormSubmitted(true);
    } else {
      enqueueSnackbar(t("enteredFunction"), { variant: "error" });
    }
    if (!isSuccess) {
      fullTestsResult.forEach((e: any) => {
        if (
          typeof e.codeOutcome === "string" &&
          e.codeOutcome.includes("Error")
        ) {
          enqueueSnackbar(e.codeOutcome, { variant: "error" });
        } else {
          setFormSubmitted(true);
        }
      });
    }
  };

  const handleRunCodeQuickTest = async () => {
    try {
      let snackbarDisplayed = false;
      if (!quickTest) {
        enqueueSnackbar(t("enterQuickTestValue"), { variant: "error" });
        snackbarDisplayed = true;
        return;
      }
      const responseQuickTest = await fetch("api/js-tasks/[...id]", {
        mode: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          solution: `console.log(${solution}(${quickTest}))`,
          variant: "quickTest",
        }),
      });
      const responsePattern = await fetch("api/js-tasks/[...id]", {
        mode: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          solution: `console.log(${task?.assignment?.patternFunction}(${quickTest}))`,
          variant: "quickTest",
        }),
      });

      if (responseQuickTest.ok) {
        const result = await responseQuickTest.json();
        setQuickCodeOutcome(
          result.map((e: any) => {
            if (e.errorName) {
              if (e.message.includes("is not a function")) {
                enqueueSnackbar(t("enterValueOrFunction"), {
                  variant: "error",
                });
                snackbarDisplayed = true;
                return null;
              } else if (!snackbarDisplayed) {
                enqueueSnackbar(e.errorName + ": " + e.message, {
                  variant: "error",
                }),
                  (snackbarDisplayed = true);
              }
              return null;
            } else if (
              e.message.startsWith('["') ||
              e.message.startsWith("[")
            ) {
              return e.message.slice(1, -1);
            }
          })
        );
      }
      if (responsePattern.ok) {
        const result = await responsePattern.json();
        setQuickExpectedResult(
          result.map((e: any) => {
            if (e.errorName && !snackbarDisplayed) {
              if (e.message.includes("is not a function")) {
                enqueueSnackbar(t("enterValueOrFunction"), {
                  variant: "error",
                });
                snackbarDisplayed = true;
                return null;
              } else if (!snackbarDisplayed) {
                enqueueSnackbar(e.errorName + ": " + e.message, {
                  variant: "error",
                });
              }
              return null;
            } else if (e.message.includes("null")) {
              enqueueSnackbar(t("unexpectedResult") + e.message, {
                variant: "error",
              });
              snackbarDisplayed = true;
              return null;
            } else if (
              e.message.startsWith('["') ||
              e.message.startsWith("[")
            ) {
              return e.message.slice(1, -1);
            }
          })
        );
      } else {
        console.error("Failed to fetch data:", responseQuickTest.statusText);
      }
    } catch (error: any) {
      console.error("Error during fetch:", error.message);
    }
  };

  useEffect(() => {
    if (fullTestsResult.length > 0) {
      const allPassed = fullTestsResult.every(
        (e: any) => e.testOutcome === true
      );
      setIsSuccess(allPassed);
    }
  }, [fullTestsResult]);

  return {
    handleRunCodeFullTests,
    handleRunCodeQuickTest,
    fullCodeOutcome,
    quickCodeOutcome,
    quickExpectedResult,
    fullTestsResult,
    setFormSubmitted,
    formSubmitted,
    middleTestsResult,
    isSuccess,
  };
};

export default useTesting;

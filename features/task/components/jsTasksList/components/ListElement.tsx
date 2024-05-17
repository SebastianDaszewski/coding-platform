"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { Button, Divider } from "@/components";
import { RunCodeIcon, CheckBadge } from "@/icons";
import { white } from "@/styles/colors";

type ListElementProps = {
  no: string;
  title: string;
  category: string;
  difficulty: string;
  taskId: string;
  dataSolutions: any;
};

const ListElement: React.FC<ListElementProps> = ({
  no,
  title,
  category,
  difficulty,
  taskId,
  dataSolutions,
}) => {
  const t = useTranslations("list");
  const router = useRouter();
  const { data } = useSession();
  const [checkSolution, setCheckSolution] = useState("");

  const ActiveUserId = (data as any)?.token?.sub;
  const dividerHeight = "h-3";

  const checkSolutionFuntion = () =>
    dataSolutions.map((e: any) => {
      if (
        e.userId === ActiveUserId &&
        e.javascriptAssignmentId === taskId &&
        e.isCompleted === true
      ) {
        setCheckSolution("done");
      } else if (
        e.userId === ActiveUserId &&
        e.javascriptAssignmentId === taskId &&
        e.isCompleted === false
      ) {
        setCheckSolution("tried");
      }
    });

  useEffect(() => {
    checkSolutionFuntion();
  }, [dataSolutions]);

  return (
    <div className="flex flex-col text-black bg-black mb-5">
      <div className="bg-grey h-15 rounded-md w-full flex justify-between">
        <div className="flex w-3/4 items-center justify-between">
          <div className="text-white text-base font-bold flex w-10 ml-5">
            {no}
          </div>
          <Divider width="0.5" height={dividerHeight} />
          <div className="text-white text-base font-bold flex ml-5 w-1/4">
            {title}
          </div>
          <Divider width="0.5" height={dividerHeight} />
          <div className="text-white text-base font-bold flex ml-5 w-1/4">
            {category}
          </div>
          <Divider width="0.5" height={dividerHeight} />
          <div className="text-white text-base font-bold flex ml-5 w-1/4">
            {difficulty}
          </div>
          <Divider width="0.5" height={dividerHeight} />
        </div>
        <div className="w-1/4 flex justify-between px-3 py-2 h-full gap-10">
          <div className="w-8 items-center flex">
            {checkSolution === "done" && (
              <CheckBadge fill="none" size="16" stroke="white" />
            )}
          </div>

          <Button
            onClick={() => {
              router.push(`/task/${taskId}/${ActiveUserId}`);
            }}
            content={
              checkSolution === "done" || checkSolution === "tried" ? (
                <>
                  <p className="mr-2">{t("tryAgain")}</p>
                  <RunCodeIcon fill={white} />
                </>
              ) : (
                <>
                  <p className="mr-2">{t("moveToTask")}</p>
                  <RunCodeIcon fill={white} />
                </>
              )
            }
            className={clsx(
              "w-5/6 rounded-md flex items-center justify-center text-white",
              {
                "bg-buttonGreen":
                  checkSolution === "tried" || checkSolution === "done",
                "bg-orange": checkSolution === "",
              }
            )}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default ListElement;

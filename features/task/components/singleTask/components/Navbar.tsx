"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { SettingsIcon } from "@/sidebarIcons";
import { FullScreenIcon } from "@/icons";
import { Button } from "@/components";
import { white } from "@/styles/colors";

import Cloak from "./timer/Cloak";
import { Task } from "../../jsTasksList/components/JsTasksList";
import { useEffect, useState } from "react";

type NavbarPropsProps = {
  handleFullscreen: any;
  allTasks: any;
  currentTask: Task;
};
const Navbar: React.FC<NavbarPropsProps> = ({
  handleFullscreen,
  allTasks,
  currentTask,
}) => {
  const t = useTranslations("task");
  const router = useRouter();
  const { data } = useSession();
  const [previousTask, setPreviousTask] = useState("");
  const [nextTask, setNextTask] = useState("");

  const ActiveUserId = (data as any)?.token?.sub;

  useEffect(() => {
    if (!allTasks || !currentTask) return;

    const currentIndex = allTasks.findIndex(
      (task: Task) => task.id === currentTask.id
    );

    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        setPreviousTask(allTasks[currentIndex - 1].id);
      } else {
        setPreviousTask("");
      }

      if (currentIndex < allTasks.length - 1) {
        setNextTask(allTasks[currentIndex + 1].id);
      } else {
        setNextTask("");
      }
    }
  }, [allTasks, currentTask]);

  return (
    <div className="h-10 bg-customGray flex justify-between rounded-md">
      <div className="flex items-center">
        <Button
          disabled={!previousTask}
          onClick={() => {
            router.push(`/task/${previousTask}/${ActiveUserId}`);
          }}
          className={clsx("text-white font-medium ml-5", {
            "transform transition-transform duration-300 hover:scale-120":
              previousTask,
          })}
          content={t("previousTask")}
        />
        <div className="h-5 w-0.5 bg-white mt-1 mx-6"></div>
        <Button
          disabled={!nextTask}
          onClick={() => {
            router.push(`/task/${nextTask}/${ActiveUserId}`);
          }}
          className={clsx("text-white font-medium", {
            "transform transition-transform duration-300 hover:scale-120":
              nextTask,
          })}
          content={t("nextTask")}
        />
        <div className="h-5 w-0.5 bg-white mt-1 mx-6"></div>
        <Cloak />
      </div>

      <div className="flex p-2">
        <Button onClick={handleFullscreen} content={<FullScreenIcon />} />
        <Button
          className="mr-2 ml-4 transform transition-transform duration-300 hover:scale-150"
          content={<SettingsIcon fill={white} />}
        />
      </div>
    </div>
  );
};

export default Navbar;

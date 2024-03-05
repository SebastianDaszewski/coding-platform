"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { MOCKED_TASK } from "@/mock/task";

import SampleInput from "./SampleInput";
import SampleOutput from "./SampleOutput";
import TaskWindow from "./TaskWindow";

const FirstTaskWindowContent = () => {
  const t = useTranslations("task");
  const {
    category,
    done,
    difficulty,
    title,
    description,
    sampleInput,
    sampleOutput,
  } = MOCKED_TASK;

  return (
    <TaskWindow firstButton={t("taskDescription")} shouldShow={false}>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-wrap h-10">
            <div className="text-white">{t("category", { category })}</div>
            <div className="h-3 w-0.5 bg-white mt-1 mx-3"></div>
            <div className="text-white">{t("done", { done })}</div>
            <div className="h-3 w-0.5 bg-white mt-1 mx-3"></div>
            <div className="text-white">{t("difficulty", { difficulty })} </div>
          </div>
          <div className="text-white text-2xl flex my-3 h-7">
            {title}
            <div>
              <Image
                className="rounded-lg ml-5"
                src="/images/green-check-icon.jpg"
                width={24}
                height={24}
                alt="Devstock Logo"
              />
            </div>
          </div>
          <div className="text-white flex">{description}</div>
          <div className="text-white flex">
            <SampleInput>{sampleInput}</SampleInput>
          </div>
          <div className="text-white flex">
            <SampleOutput>{sampleOutput}</SampleOutput>
          </div>
        </div>
      </div>
    </TaskWindow>
  );
};

export default FirstTaskWindowContent;

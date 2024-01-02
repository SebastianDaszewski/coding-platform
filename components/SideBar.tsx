"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ToolTip from "@/components/Tooltip";

import Icon from "./Icon";

const SideBar = () => {
  const [fullMenuView, setFullMenuView] = useState(false);
  const [transformScaleHome, setTransformScaleHome] = useState(false);
  const [transformScaleRanking, setTransformScaleRanking] = useState(false);
  const [transformScaleLessons, setTransformScaleLessons] = useState(false);
  const [transformScaleCalendar, setTransformScaleCalendar] = useState(false);
  const [transformScaleQuest, setTransformScaleQuest] = useState(false);
  const [transformScaleSettings, setTransformScaleSettings] = useState(false);
  const [transformScaleAdmin, setTransformScaleAdmin] = useState(false);

  const t = useTranslations("sideBar");

  const isHomePage = usePathname().includes("/dashboard");
  const isRankingPage = usePathname().includes("/ranking");
  const isLessonsPage = usePathname().includes("/lessons");
  const isCalendarPage = usePathname().includes("/calendar");
  const isQuestPage = usePathname().includes("/quest");
  const isSettingsPage = usePathname().includes("/settings");
  const isAdminPage = usePathname().includes("/admin");

  return (
    <>
      <div
        className={clsx(
          "w-15 items-start flex flex-col justify-start gap-8 bg-black h-full fixed",
          {
            "w-55": fullMenuView,
          }
        )}
      >
        <div
          onMouseDown={() => setFullMenuView((prevValue) => !prevValue)}
          className="bg-doubleVectorBg w-10 h-10 flex items-center justify-center mt-8 rounded-lg ml-2"
        >
          <Image
            src={
              fullMenuView
                ? "/images/doubleVectorLeft.jpg"
                : "/images/doubleVectorRight.jpg"
            }
            width={15}
            height={14}
            alt="doubleVector"
          />
        </div>
        <div
          className="group justify-center w-55 ml-4"
          onMouseEnter={() => setTransformScaleHome(true)}
          onMouseLeave={() => setTransformScaleHome(false)}
        >
          <Link href="/dashboard" className="flex items-center">
            {fullMenuView ? (
              <>
                <div
                  className={clsx({
                    "transition-transform transform scale-150":
                      transformScaleHome,
                  })}
                >
                  <Icon iconName="HomeIcon" />
                </div>
                <span
                  className={clsx(`text-sm ml-7`, {
                    "text-orange": isHomePage,
                    "text-white": !isHomePage,
                    hidden: !fullMenuView,
                  })}
                >
                  {`${t("home")}`}
                </span>
              </>
            ) : (
              <>
                <ToolTip tooltip={`${t("home")}`}>
                  <div
                    className={clsx({
                      "transition-transform transform scale-150":
                        transformScaleHome,
                    })}
                  >
                    <Icon iconName="HomeIcon" />
                  </div>
                </ToolTip>
              </>
            )}
          </Link>
        </div>

        <div
          className="group justify-center w-55 ml-4"
          onMouseEnter={() => setTransformScaleRanking(true)}
          onMouseLeave={() => setTransformScaleRanking(false)}
        >
          <Link href="/ranking" className="flex items-center">
            {fullMenuView ? (
              <>
                <div
                  className={clsx({
                    "transition-transform transform scale-150":
                      transformScaleRanking,
                  })}
                >
                  <Icon iconName="RankingIcon" />
                </div>
                <span
                  className={clsx(`text-sm ml-7`, {
                    "text-orange": isRankingPage,
                    "text-white": !isRankingPage,
                    hidden: !fullMenuView,
                  })}
                >
                  {`${t("ranking")}`}
                </span>
              </>
            ) : (
              <>
                <ToolTip tooltip={`${t("ranking")}`}>
                  <div
                    className={clsx({
                      "transition-transform transform scale-150":
                        transformScaleRanking,
                    })}
                  >
                    <Icon iconName="RankingIcon" />
                  </div>
                </ToolTip>
              </>
            )}
          </Link>
        </div>
        <div
          className="group justify-center w-55 ml-4"
          onMouseEnter={() => setTransformScaleLessons(true)}
          onMouseLeave={() => setTransformScaleLessons(false)}
        >
          <Link href="/lessons" className="flex items-center">
            {fullMenuView ? (
              <>
                <div
                  className={clsx({
                    "transition-transform transform scale-150":
                      transformScaleLessons,
                  })}
                >
                  <Icon iconName="LessonsIcon" />
                </div>
                <span
                  className={clsx(`text-sm ml-7`, {
                    "text-orange": isLessonsPage,
                    "text-white": !isLessonsPage,
                    hidden: !fullMenuView,
                  })}
                >
                  {`${t("lessons")}`}
                </span>
              </>
            ) : (
              <>
                <ToolTip tooltip={`${t("lessons")}`}>
                  <div
                    className={clsx({
                      "transition-transform transform scale-150":
                        transformScaleLessons,
                    })}
                  >
                    <Icon iconName="LessonsIcon" />
                  </div>
                </ToolTip>
              </>
            )}
          </Link>
        </div>
        <div
          className="group justify-center w-55 ml-4"
          onMouseEnter={() => setTransformScaleCalendar(true)}
          onMouseLeave={() => setTransformScaleCalendar(false)}
        >
          <Link href="/calendar" className="flex items-center">
            {fullMenuView ? (
              <>
                <div
                  className={clsx({
                    "transition-transform transform scale-150":
                      transformScaleCalendar,
                  })}
                >
                  <Icon iconName="CalendarIcon" />
                </div>
                <span
                  className={clsx(`text-sm ml-7`, {
                    "text-orange": isCalendarPage,
                    "text-white": !isCalendarPage,
                    hidden: !fullMenuView,
                  })}
                >
                  {`${t("calendar")}`}
                </span>
              </>
            ) : (
              <>
                <ToolTip tooltip={`${t("calendar")}`}>
                  <div
                    className={clsx({
                      "transition-transform transform scale-150":
                        transformScaleCalendar,
                    })}
                  >
                    <Icon iconName="CalendarIcon" />
                  </div>
                </ToolTip>
              </>
            )}
          </Link>
        </div>
        <div
          className="group justify-center w-55 ml-4"
          onMouseEnter={() => setTransformScaleQuest(true)}
          onMouseLeave={() => setTransformScaleQuest(false)}
        >
          <Link href="/quest" className="flex items-center">
            {fullMenuView ? (
              <>
                <div
                  className={clsx({
                    "transition-transform transform scale-150":
                      transformScaleQuest,
                  })}
                >
                  <Icon iconName="QuestIcon" />
                </div>
                <span
                  className={clsx(`text-sm ml-7`, {
                    "text-orange": isQuestPage,
                    "text-white": !isQuestPage,
                    hidden: !fullMenuView,
                  })}
                >
                  {`${t("quest")}`}
                </span>
              </>
            ) : (
              <>
                <ToolTip tooltip={`${t("quest")}`}>
                  <div
                    className={clsx({
                      "transition-transform transform scale-150":
                        transformScaleQuest,
                    })}
                  >
                    <Icon iconName="QuestIcon" />
                  </div>
                </ToolTip>
              </>
            )}
          </Link>
        </div>
        <div className="flex flex-col">
          <div
            className={clsx(
              "w-15 flex h-2 border-t border-solid py-7 border-gray-700",
              {
                "w-55": fullMenuView,
              }
            )}
          >
            <div
              className="group justify-center w-55 ml-4"
              onMouseEnter={() => setTransformScaleSettings(true)}
              onMouseLeave={() => setTransformScaleSettings(false)}
            >
              <Link href="/settings" className="flex items-center">
                {fullMenuView ? (
                  <>
                    <div
                      className={clsx({
                        "transition-transform transform scale-150":
                          transformScaleSettings,
                      })}
                    >
                      <Icon iconName="SettingsIcon" />
                    </div>
                    <span
                      className={clsx(`text-sm ml-7`, {
                        "text-orange": isSettingsPage,
                        "text-white": !isSettingsPage,
                        hidden: !fullMenuView,
                      })}
                    >
                      {`${t("settings")}`}
                    </span>
                  </>
                ) : (
                  <>
                    <ToolTip tooltip={`${t("settings")}`}>
                      <div
                        className={clsx({
                          "transition-transform transform scale-150":
                            transformScaleSettings,
                        })}
                      >
                        <Icon iconName="SettingsIcon" />
                      </div>
                    </ToolTip>
                  </>
                )}
              </Link>
            </div>
          </div>
          <div
            className={clsx(
              "w-15 flex h-2 border-b border-solid py-10 border-gray-700",
              {
                "w-55": fullMenuView,
              }
            )}
          >
            <div
              className="group justify-center w-55 ml-4"
              onMouseEnter={() => setTransformScaleAdmin(true)}
              onMouseLeave={() => setTransformScaleAdmin(false)}
            >
              <Link href="/admin" className="flex items-center">
                {fullMenuView ? (
                  <>
                    <div
                      className={clsx({
                        "transition-transform transform scale-150":
                          transformScaleAdmin,
                      })}
                    >
                      <Icon iconName="AdminIcon" />
                    </div>
                    <span
                      className={clsx(`text-sm ml-7`, {
                        "text-orange": isAdminPage,
                        "text-white": !isAdminPage,
                        hidden: !fullMenuView,
                      })}
                    >
                      {`${t("admin")}`}
                    </span>
                  </>
                ) : (
                  <>
                    <ToolTip tooltip={`${t("admin")}`}>
                      <div
                        className={clsx({
                          "transition-transform transform scale-150":
                            transformScaleAdmin,
                        })}
                      >
                        <Icon iconName="AdminIcon" />
                      </div>
                    </ToolTip>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

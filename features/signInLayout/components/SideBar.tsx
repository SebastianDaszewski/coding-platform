"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";

import SidebarLink from "./SideBarLink";

type SidebarItem = {
  message: string;
  href: string;
  iconName: string;
};

const sidebarItems: SidebarItem[] = [
  {
    message: "dashboard",
    href: "/dashboard",
    iconName: "DashboardIcon",
  },
  {
    message: "ranking",
    href: "/ranking",
    iconName: "RankingIcon",
  },
  {
    message: "task",
    href: "/task",
    iconName: "JsTasksListIcon",
  },
  {
    message: "settings",
    href: "/settings",
    iconName: "SettingsIcon",
  },
];

const SideBar = () => {
  const [fullMenuView, setFullMenuView] = useState(false);
  const t = useTranslations("sideBar");
  const pathname = usePathname();
  const isActivePage = (path: string) => pathname.includes(path);

  const getIconColor = (path: string) => {
    return isActivePage(path) ? "orange" : "white";
  };

  return (
    <div className="flex h-full">
      <div
        className={clsx(
          "w-15 items-start flex flex-col justify-start gap-8 bg-black h-full transition-all duration-150",
          {
            "w-55": fullMenuView,
          }
        )}
      >
        <button
          onMouseDown={() => setFullMenuView((prev) => !prev)}
          className="bg-doubleVectorBg w-10 h-10 flex items-center justify-center mt-8 rounded-lg ml-2"
        >
          <div className="transition-transform duration-300 hover:scale-150">
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
        </button>
        {sidebarItems.map(({ message, href, iconName }) => (
          <SidebarLink
            key={message}
            text={t(message)}
            href={href}
            tooltip={t(message)}
            iconName={iconName}
            fullMenuView={fullMenuView}
            fill={getIconColor(href)}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;

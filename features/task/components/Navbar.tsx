"use client";

import { useTranslations } from "next-intl";

import { SettingsIcon } from "@/sidebarIcons";
import { FullScreenIcon } from "@/icons";
import Button from "@/components/Button";

import Cloak from "./Cloak";

type NavbarPropsProps = {
  handleFullscreen: any;
};
const Navbar: React.FC<NavbarPropsProps> = ({ handleFullscreen }) => {
  const t = useTranslations("task");

  return (
    <div className="h-10 bg-customGray flex justify-between rounded-md">
      <div className="flex items-center">
        <Button
          className="text-white font-medium ml-5 transform transition-transform duration-300 hover:scale-120"
          content={t("previousTask")}
        />
        <div className="h-5 w-0.5 bg-white mt-1 mx-6"></div>
        <Button
          className="text-white font-medium transform transition-transform duration-300 hover:scale-120"
          content={t("nextTask")}
        />
        <div className="h-5 w-0.5 bg-white mt-1 mx-6"></div>
        <Cloak />
      </div>

      <div className="flex p-2">
        <Button
          className="transform transition-transform duration-300 hover:scale-150"
          onClick={handleFullscreen}
          content={<FullScreenIcon />}
        />
        <Button
          className="mr-2 ml-4 transform transition-transform duration-300 hover:scale-150"
          content={<SettingsIcon fill="white" />}
        />
      </div>
    </div>
  );
};

export default Navbar;

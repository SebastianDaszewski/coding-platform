"use client";

import { useTranslations } from "next-intl";

import SignInLayout from "@/features/signInLayout/layout";
import SideBar from "@/components/SideBar";
import { DashboardHeader } from "@/components";

const Settings = () => {
  const t = useTranslations("sideBar");

  return (
    <div className="bg-dashboardGray h-screen w-screen">
      <SignInLayout>
        <SideBar />
        <DashboardHeader title={`${t("settings")}`} />
      </SignInLayout>
    </div>
  );
};

export default Settings;

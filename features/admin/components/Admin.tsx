"use client";

import { useTranslations } from "next-intl";

import SignInLayout from "@/features/signInLayout/layout";
import { DashboardHeader } from "@/components";

const Admin = () => {
  const t = useTranslations("sideBar");

  return (
    <div className="bg-dashboardGray h-screen w-screen">
      <SignInLayout>
        <DashboardHeader title={t("admin")} />
      </SignInLayout>
    </div>
  );
};

export default Admin;

"use client";

import SignInLayout from "@/features/signInLayout/layout";
import SideBar from "@/components/SideBar";

const Dashboard = () => {
  return (
    <div className="bg-dashboardGray h-screen w-screen">
      <SignInLayout>
        <SideBar />
      </SignInLayout>
    </div>
  );
};

export default Dashboard;

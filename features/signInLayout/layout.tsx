"use client";

import { TopbarSignIn } from "./components";
import { SocialMediaBar } from "@/components";
import SideBar from "./components/SideBar";

type SignInLayoutProps = {
  children: React.ReactNode;
};

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <SocialMediaBar />
      <TopbarSignIn />
      <div className="flex w-full h-sidebarHeight">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default SignInLayout;

"use client";

import { Topbar, Footer } from "./components";
import { SocialMediaBar } from "@/components";

type SignOutLayoutProps = {
  children: React.ReactNode;
};

const SignOutLayout: React.FC<SignOutLayoutProps> = ({ children }) => {
  return (
    <section className="flex h-full flex-col">
      <SocialMediaBar />
      <div className="flex-grow">
        <Topbar />
        <div className="h-content-container">{children}</div>
      </div>
      <div className="relative w-full h-20 bg-customGray flex items-center justify-center tall:absolute tall:bottom-0">
        <Footer />
      </div>
    </section>
  );
};

export default SignOutLayout;

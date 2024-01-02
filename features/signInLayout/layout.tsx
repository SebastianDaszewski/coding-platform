"use client";

import { SocialMediaBar, TopbarSignIn } from "./components";

type SignInLayoutProps = {
  children: React.ReactNode;
};

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <>
      <SocialMediaBar />
      <TopbarSignIn />
      {children}
    </>
  );
};

export default SignInLayout;

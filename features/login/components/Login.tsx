"use client";

import { Background } from "@/components";
import SignOutLayout from "@/features/signOutLayout/layout";
import LoginForm from "@/features/login/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-black flex flex-col h-screen">
      <Background />
      <SignOutLayout>
        <LoginForm />
      </SignOutLayout>
    </div>
  );
};

export default LoginPage;

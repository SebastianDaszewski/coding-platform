"use client";

import SignOutLayout from "@/features/signOutLayout/layout";
import { Background } from "@/components";

import RegistrationForm from "./RegistrationForm";

const Register = () => {
  return (
    <div className="bg-black flex flex-col h-screen">
      <Background />
      <SignOutLayout>
        <RegistrationForm />
      </SignOutLayout>
    </div>
  );
};

export default Register;

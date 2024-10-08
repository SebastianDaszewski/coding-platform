"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const TopbarSignIn = () => {
  const t = useTranslations("TopBar");

  const { data } = useSession();

  const userNickname = (data as any)?.token?.nickname;

  return (
    <div className="flex h-20 bg-customGray w-screen items-center text-white text-center justify-end relative">
      <div>{userNickname && `${t("hi")} ${userNickname}`}</div>
      <div className="mx-5">
        <Image
          src="/images/avatar.jpg"
          width={48}
          height={48}
          alt="Devstock Logo"
        />
      </div>
      <button onClick={() => signOut()} className="text-base/6 mr-10">
        {t("signOut")}
      </button>
    </div>
  );
};

export default TopbarSignIn;

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const TopbarSignIn = () => {
  const t = useTranslations("TopBar");

  return (
    <div className="flex h-20 bg-customGray w-screen items-center text-center justify-center relative">
      <div className="flex h-20 bg-customGray">
        <nav className="w-screen text-white">
          <div className="h-20 flex flex-wrap items-center text-center justify-between mx-10">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/images/logo.jpg"
                width={120}
                height={44}
                alt="Devstock Logo"
              />
            </Link>
            <div className="flex md:order-2 items-center">
              <span className="m-5 text-base/6">Devstock.pl</span>
              <span className="m-5 text-2xl/6">|</span>
              <div className="mr-5 ml-5">
                <Image
                  src="/images/avatar.jpg"
                  width={48}
                  height={48}
                  alt="Devstock Logo"
                />
              </div>
              <button onClick={() => signOut()} className="m-5 text-base/6">
                {t("signOut")}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TopbarSignIn;

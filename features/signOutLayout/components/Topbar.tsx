"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Topbar = () => {
  const t = useTranslations("TopBar");
  const currentPath = usePathname();

  const isRegistrationPath = currentPath === "/register";
  const isLoginPath = currentPath === "/login";

  const registrationButtonColor = isRegistrationPath
    ? "bg-yellow-500"
    : "bg-blue";

  const loginButtonColor = isLoginPath && "text-yellow-400";

  return (
    <div className="flex h-20 bg-customGray items-center text-center justify-center relative">
      <div className="flex h-20 bg-customGray">
        <nav className="w-screen text-white">
          <div className="h-20 flex flex-wrap items-center text-center justify-between mx-10">
            <Link href="/" className="flex items-center">
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
              <Link href="/login">
                <span
                  className={clsx("m-5 mr-10 text-base/6", loginButtonColor)}
                >
                  {t("signIn")}
                </span>
              </Link>
              <Link href="/register">
                <button
                  type="button"
                  className={clsx(
                    "text-white w-37.5 h-10 focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-4 py-2 text-center",
                    registrationButtonColor
                  )}
                >
                  {t("registration")}
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Topbar;

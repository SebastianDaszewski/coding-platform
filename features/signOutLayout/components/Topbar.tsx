"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import Image from "next/image";
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
    <div className="flex h-20 bg-customGray items-center justify-between text-center relative text-white px-10">
      <div className="flex justify-start">
        <Link href="/landing" className="flex items-center">
          <Image
            src="/images/home.jpg"
            width={30}
            height={44}
            alt="Devstock Logo"
          />
        </Link>
      </div>
      <div className="flex md:order-2 items-center justify-end">
        <Link href="/login">
          <span className={clsx("m-5 mr-10 text-base/6", loginButtonColor)}>
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
  );
};

export default Topbar;

"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { Input, Checkbox } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "@/icons";

const LoginForm = () => {
  const t = useTranslations("loginForm");
  const [errorMessageEmailOrPassword, setErrorMessageEmailOrPassword] =
    useState("");
  const router = useRouter();
  const session = useSession();
  console.log(session.status);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const validationSchema = z.object({
    email: z.string().email({
      message: `${t("wrongEmail")}`,
    }),
    password: z.string().nonempty({
      message: `${t("passwordRequired")}`,
    }),
    remember: z.boolean(),
  });
  const {
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const loginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (!callback?.error) {
        enqueueSnackbar(`${t("confirmLogin")}`);
        router.push("/dashboard");
      }
      if (callback?.status === 401) {
        setErrorMessageEmailOrPassword(`${t("EmailOrPasswordIncorrect")}`);
        enqueueSnackbar(`${t("EmailOrPasswordIncorrect")}`);
      }
    });
  };

  return (
    <>
      <div className="relative flex justify-center w-full">
        <div className="w-112 h-141 relative top-35 tall:top-100 rounded-lg text-white flex flex-col justify-between bg-customBlack shadow-custom">
          <div className="w-112 p-9 justify-between">
            <SnackbarProvider />
            <form>
              <span className="font-thin text-2xl/9 text-white">
                {t("signIn")}
              </span>
              <div className="mt-7 relative">
                <Input
                  width="w-96"
                  id="email"
                  label={t("email")}
                  placeholder="name@example.com"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  errorMessage={
                    errorMessageEmailOrPassword || errors.email?.message
                  }
                />
              </div>
              <div className="mt-8 mb-8">
                <Input
                  width="w-96"
                  id="password"
                  label={t("password")}
                  placeholder="•••••••••"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  errorMessage={
                    errorMessageEmailOrPassword || errors.password?.message
                  }
                />
              </div>
              <div className="flex items-start">
                <Checkbox
                  label={t("rememberMe")}
                  href="#"
                  {...register("remember")}
                />
              </div>
              <button
                type="submit"
                className="mt-7 mb-1 font-medium w-96 h-10 py-2.5	px-5 text-white bg-blue rounded-lg"
                onClick={loginUser}
              >
                {t("signIn")}
              </button>
              <label className="font-medium text-sm/5.25">
                <Link href="/login" className="text-blue hover:underline">
                  <u>{t("forgotPassword")}</u>
                </Link>
              </label>
              <div className="flex mt-6 mb-6"></div>
            </form>
            <button
              onClick={() => signIn("github")}
              className="-mt-5 mb-5 w-96 h-10 py-2.5 px-5 text-white bg-black hover:bg-black-50 focus:ring-4 focus:outline-none focus:ring-blue rounded-lg flex items-center justify-center"
            >
              <div className="flex flex-wrap">
                <p className="mr-3 text-4/6 font-medium">{t("githubLogin")}</p>
                <GithubIcon />
              </div>
            </button>
            <label className="font-medium text-sm/5.25 text-white-900">
              {t("stillDontHaveAccount")}
              <Link
                href="/register"
                className="font-medium text-sm/5.25 text-blue hover:underline"
              >
                <u>{t("registration")}</u>
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;

"use client";

import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import { Input, Checkbox } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const t = useTranslations("loginForm");

  type ValidationSchema = z.infer<typeof validationSchema>;

  const validationSchema = z.object({
    email: z.string().email({
      message: "wrongEmail",
    }),
    password: z.string().nonempty({
      message: "passwordRequired",
    }),
    remember: z.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data, "data");
    setFormSubmitted(true);
  };
  return (
    <div className="relative flex justify-center w-full">
      <div className="w-112 h-141 relative top-35 tall:top-100 rounded-lg text-white flex flex-col justify-between bg-customBlack shadow-custom">
        <form
          className="w-112 p-9 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="font-thin text-2xl/9 text-white">{t("signIn")}</span>
          <div className="mt-7 relative">
            <Input
              width="w-96"
              id="emailLogin"
              label={t("email")}
              placeholder="name@example.com"
              type="email"
              errorMessage={errors.email?.message && t(errors.email?.message)}
              {...register("email")}
            />
          </div>
          <div className="mt-8 mb-8">
            <Input
              width="w-96"
              id="password"
              label={t("password")}
              placeholder="•••••••••"
              type="password"
              errorMessage={
                errors.password?.message && t(errors.password?.message)
              }
              {...register("password")}
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
            className="mt-7 mb-1 font-medium w-96 h-10 py-2.5	px-5 text-white bg-blue-700 rounded-lg"
          >
            {t("signIn")}
          </button>
          <label className="font-medium text-sm/5.25">
            <Link href="/login" className="text-blue-600 hover:underline">
              <u>{t("forgotPassword")}</u>
            </Link>
          </label>
          <div className="flex mt-6 mb-6">
            <button className="w-96 h-10 py-2.5	px-5 text-white bg-black hover:bg-black-50 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg flex items-center justify-center">
              <div className="flex flex-wrap">
                <p className="mr-3 text-4/6 font-medium">{t("githubLogin")}</p>
                <Image
                  src="/images/Github.jpg"
                  width={24}
                  height={23.27}
                  alt="Github Logo"
                />
              </div>
            </button>
          </div>
          <label className="font-medium text-sm/5.25 text-white-900">
            {t("stillDontHaveAccount")}
            <Link
              href="/register"
              className="font-medium text-sm/5.25 text-blue-600 hover:underline"
            >
              <u>{t("registration")}</u>
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

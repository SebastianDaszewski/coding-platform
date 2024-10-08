"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputLoggedOut, Checkbox, TextLink } from "@/components";

const RegistrationForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const t = useTranslations("registrationForm");
  const router = useRouter();

  type ValidationSchema = z.infer<typeof validationSchema>;

  const validationSchema = z
    .object({
      nickname: z.string().nonempty({ message: t("nickRequired") }),
      firstName: z.string().nonempty({ message: t("nameRequired") }),
      lastName: z.string().nonempty({ message: t("lastNameRequired") }),
      email: z
        .string()
        .nonempty({ message: t("wrongEmail") })
        .email({
          message: t("wrongEmail"),
        }),
      password: z
        .string()
        .min(8, { message: t("shortPassword") })
        .refine(
          (password) => {
            const hasLowerCase = /[a-z]/.test(password);
            const hasUpperCase = /[A-Z]/.test(password);
            const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]/.test(
              password
            );
            const hasNumber = /[0-9]/.test(password);

            return hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber;
          },
          {
            message: t("passwordComposition"),
          }
        ),
      confirmPassword: z.string().nonempty({ message: t("passwordRequired") }),
      terms: z.boolean().refine((accept) => accept === true, {
        message: t("termsRequired"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("samePasswords"),
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<{
    nickname: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
  }> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else if (response.status === 409) {
        enqueueSnackbar(t("existingEmail"), { variant: "error" });
      } else if (response.status === 410) {
        enqueueSnackbar(t("existingNickname"), { variant: "error" });
      }
    } catch (error) {}
  };

  const handleClickOutside = () => {
    router.push("/login");
  };

  return (
    <>
      {!formSubmitted ? (
        <div className="relative flex justify-center h-full">
          <SnackbarProvider />

          <div className="top-20 tall:top-100 w-175 h-163.5 p-9 rounded-lg gap-32 text-white flex flex-col justify-start items-center relative shadow-custom bg-customGray shortMax:top-0 shortMax:scale-90">
            <form className="w-159" onSubmit={handleSubmit(onSubmit)}>
              <span className="text-2xl/9 font-extralight text-white">
                {t("registration")}
              </span>
              <div className="flex mt-10">
                <div className="mr-6">
                  <div className="mb-7">
                    <InputLoggedOut
                      width="w-76.25"
                      id="nick"
                      label={t("nick")}
                      placeholder={t("nick")}
                      type="text"
                      errorMessage={errors.nickname?.message}
                      {...register("nickname")}
                    />
                  </div>
                  <InputLoggedOut
                    width="w-76.25"
                    id="lastName"
                    label={t("lastName")}
                    placeholder={t("lastName")}
                    type="text"
                    errorMessage={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>
                <div className="mr-4">
                  <div className="mb-7">
                    <InputLoggedOut
                      width="w-76.25"
                      id="firstName"
                      label={t("name")}
                      placeholder={t("name")}
                      type="text"
                      errorMessage={errors.firstName?.message}
                      {...register("firstName")}
                    />
                  </div>
                  <InputLoggedOut
                    width="w-76.25"
                    id="email"
                    label={t("email")}
                    placeholder="name@example.com"
                    type="email"
                    errorMessage={errors.nickname?.message}
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="mb-6 mt-7">
                <InputLoggedOut
                  width="w-159"
                  id="password"
                  label={t("password")}
                  placeholder="•••••••••"
                  type="password"
                  errorMessage={errors.password?.message}
                  {...register("password")}
                />
              </div>
              <div className="mb-8">
                <InputLoggedOut
                  width="w-159"
                  id="confirmPassword"
                  label={t("confirmPassword")}
                  placeholder="•••••••••"
                  type="password"
                  errorMessage={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>
              <div className="flex items-start mb-6 mt-5">
                <div className="flex items-center">
                  <Checkbox
                    label={t("agree")}
                    linkName={t("terms")}
                    href="/register"
                    errorMessage={errors.terms?.message}
                    {...register("terms")}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 mb-7 text-base/6 font-medium h-10 w-159 py-2.5 px-5 text-white bg-blue hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue rounded-lg text-center"
              >
                {t("registration")}
              </button>
              <TextLink
                text={t("doYouHaveAccount")}
                linkName={t("signIn")}
                href="/login"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="relative flex justify-center w-full h-full z-50">
          <div className="relative mt-12 max-w-screen-1g rounded-lg">
            <div className="flex items-center justify-center">
              <div className="p-8 gap-8 w-175 h-69.5 rounded-lg text-white flex flex-col items-center justify-center shadow-custom bg-customGray">
                <span className="text-white font-extralight text-3xl/9">
                  {t("successRegistration")}
                </span>
                <span className="text-white font-medium text-sm/5.25">
                  {t("canLogin")}
                </span>
                <Link href="/login">
                  <button
                    type="submit"
                    className="h-10 w-76.25 text-base text-medium leading-6 bg-customBlue focus:ring-4 focus:outline-none focus:ring-blue rounded-lg text-center"
                  >
                    {t("signIn")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {formSubmitted && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 z-40 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default RegistrationForm;

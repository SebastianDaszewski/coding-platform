"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";

import { Background } from "@/components";

type Texts = {
  contentFirstParagraph: string;
  contentSecondParagraph: string;
  cardTitle: string;
  cardText: string;
  cardButton: string;
};

type ContentProps = {
  texts?: Texts;
};

const Content: React.FC<ContentProps> = ({ texts }) => {
  const t = useTranslations("Content");

  const isTextPresent =
    texts && Object.values(texts).some((text) => text.length > 0);
  const shouldShowImageOnLeft = !isTextPresent;

  return (
    <>
      <div className="bg-black relative h-120 w-screen">
        <Background />
        <div className="relative flex flex-col items-center top-20">
          <h1 className="font-extrabold text-16/15 tracking-wider text-center text-white">
            Codebusters _/&gt;
          </h1>
          <h6 className="m-2 text-2xl/9 tracking-wider text-center text-white">
            by
          </h6>
          <div className="flex flex-wrap items-center">
            <Image
              src="/images/second-logo.jpg"
              width={69.81}
              height={45.86}
              alt="Devstock Logo"
            />
            <div className="m-3">
              <Image
                src="/images/Devstock.jpg"
                width={100.89}
                height={16.05}
                alt="Devstock"
              />
            </div>
          </div>
          <h6 className="text-2xl/9 tracking-wider text-center text-white w-192 m-5 font-thin">
            {t("heroText")}
          </h6>
          <div>
            <button className="text-base/6 mr-10 bg-red w-50 h-12 rounded-lg text-white px-4 py-2 font-medium">
              {t("startLearningBtn")} <div className="inline-flex m-1"></div>
              <Image
                src="/images/Vector.jpg"
                width={16}
                height={10}
                alt="Vector"
              />
            </button>
            <button className="text-white border-white border border-solid w-50 h-12 rounded-lg text-center text-base/6 font-medium">
              {t("getToKnowBtn")}
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen bg-white flex flex-col items-center 256:h-175">
        <div className="bg-white w-screen max-w-341.5">
          <div
            className={clsx("flex bg-white justify-center items-center", {
              "flex flex-row-reverse 341.5:h-150 256:h-100 bg-white":
                shouldShowImageOnLeft === true,
            })}
          >
            <div
              className={clsx(
                "flex ml-10 flex-col text-2xl/15 tracking-wider text-start text-black",
                {
                  "mr-5 flex text-2xl/15 tracking-wider text-black ":
                    shouldShowImageOnLeft === true,
                }
              )}
            >
              <h1
                className={clsx(
                  "font-extrabold tracking-wider text-black mb-3 256:leading-11 256:text-12 256:w-112 341.5:mr-20 341.5:leading-15 341.5:text-16 341.5:w-130",
                  {
                    "mr-0 font-extrabold tracking-5 text-black mb-3 256:leading-15 256:text-12":
                      shouldShowImageOnLeft === true,
                  }
                )}
              >
                {t("contentTitle")}
              </h1>
              <h6
                className={clsx(
                  "tracking-wider text-black w-130 font-thin 256:leading-6 256:w-100 256:text-sm 341.5:w-130 341.5:text-xl 341.5:leading-7.5",
                  {
                    hidden: shouldShowImageOnLeft === true,
                  }
                )}
              >
                {texts?.contentFirstParagraph}
              </h6>
              <h6
                className={clsx(
                  "tracking-wider text-black w-130 font-thin 256:leading-6 256:w-100 256:text-sm 341.5:w-130 341.5:mt-5 341.5:text-xl 341.5:leading-7.5",
                  {
                    hidden: shouldShowImageOnLeft === true,
                  }
                )}
              >
                {texts?.contentSecondParagraph}
              </h6>
            </div>
            <div
              className={clsx(
                "flex justify-center items-center ml-20 mr-10 mt-20 341.5:mb-20 256:mb-5",
                {
                  "ml-20 mr-10 mt-20 341.5:mb-20 256:mb-5":
                    shouldShowImageOnLeft === true,
                }
              )}
            >
              <Image
                src="/images/video.jpg"
                width={643}
                height={396}
                alt="video"
                className="max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex-grow max-h-10"></div>
        <div
          className={clsx(
            "p-7 flex flex-col text-black text-start justify-center w-197.5 h-49.5 border border-gray rounded-lg shadow-lg",
            {
              hidden: shouldShowImageOnLeft === true,
            }
          )}
        >
          <span
            className={clsx("text-8 font-thin leading-10", {
              hidden: shouldShowImageOnLeft === true,
            })}
          >
            {texts?.cardTitle}
          </span>
          <span
            className={clsx("font-thin text-lg leading-6.75", {
              hidden: shouldShowImageOnLeft === true,
            })}
          >
            {texts?.cardText}
          </span>
          <Link
            className={clsx("text-blue-600 text-base leading-6", {
              hidden: shouldShowImageOnLeft === true,
            })}
            href="#"
          >
            {texts?.cardButton}
          </Link>
        </div>
      </div>
      <div className="w-full h-50 mt-10 border-none"></div>
    </>
  );
};

export default Content;

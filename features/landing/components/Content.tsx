"use client";

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

  return (
    <>
      <div className="bg-black relative h-120">
        <Background />
        <div className="relative flex flex-col items-center top-20">
          <h1 className="font-extrabold text-16/15 tracking-wider text-center text-white">
            Coding platform
          </h1>
          <h6 className="m-3 text-2xl/9 tracking-wider text-center text-white">
            by
          </h6>
          <div className="flex flex-wrap items-center text-white text-3xl/9">
            Sebastian Daszewski
          </div>
          <h6 className="text-2xl/9 tracking-wider text-center text-white w-192 m-5 font-thin">
            {t("heroText")}
          </h6>
          <Link
            href="/register"
            className="text-base/6 bg-red rounded-lg text-white px-12 py-4 font-medium"
          >
            {t("startLearningBtn")} <div className="inline-flex m-1"></div>
            <Image
              src="/images/Vector.jpg"
              width={16}
              height={10}
              alt="Vector"
            />
          </Link>
        </div>
      </div>
      <div className="bg-white flex flex-col items-center 256:h-175">
        <div className="bg-white max-w-341.5">
          <div className="flex bg-white justify-center items-center">
            <div className="flex flex-col text-2xl/15 tracking-wider text-center text-black mt-20">
              <h1 className="font-extrabold tracking-wider text-black mb-3 256:leading-11 256:text-12 256:w-112 341.5:leading-15 341.5:text-16 341.5:w-130">
                {t("contentTitle")}
              </h1>
              <h6 className="tracking-wider text-black w-130 font-thin 256:leading-6 256:w-100 256:text-sm 341.5:w-130 341.5:text-xl 341.5:leading-7.5">
                {texts?.contentFirstParagraph}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex-grow max-h-20"></div>
        <div className="p-7 flex flex-col text-black text-center justify-center w-197.5 h-49.5 border border-gray-800 rounded-lg shadow-lg">
          <span className="text-8 font-thin leading-10">
            {texts?.cardTitle}
          </span>
          <Link
            href="/register"
            className="relative text-black text-base leading-6 inline-block mt-5 text-decoration-line: underline"
          >
            {texts?.cardButton}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Content;

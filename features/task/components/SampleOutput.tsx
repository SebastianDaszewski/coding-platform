"use client";

import { useTranslations } from "next-intl";

type SampleOutputProps = {
  children: React.ReactNode;
};
const SampleOutput: React.FC<SampleOutputProps> = ({ children }) => {
  const t = useTranslations("task");

  return (
    <div className="flex flex-col w-full mb-5">
      <div className="text-white flex">{t("sampleOutput")}</div>
      <div className="text-white flex w-full bg-customLightGray rounded-md shadow-sampleWindowShadow p-2">
        {children}
      </div>
    </div>
  );
};

export default SampleOutput;

"use client";

import { useTranslations } from "next-intl";

type SampleInputProps = {
  children: React.ReactNode;
};
const SampleInput: React.FC<SampleInputProps> = ({ children }) => {
  const t = useTranslations("task");

  return (
    <div className="flex flex-col w-full my-5">
      <div className="text-white flex">{t("sampleInput")}</div>
      <div className="text-white flex w-full bg-customLightGray rounded-md shadow-sampleWindowShadow p-2">
        {children}
      </div>
    </div>
  );
};

export default SampleInput;

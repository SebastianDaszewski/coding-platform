"use client";

import { useTranslations } from "next-intl";

import Button from "@/components/Button";

type ConsoleWindowProps = {
  content: any;
  firstButton: string;
};
const ConsoleWindow: React.FC<ConsoleWindowProps> = ({
  content,
  firstButton,
}) => {
  const t = useTranslations("task");

  return (
    <div className="mb-10 max-h-30">
      <div className="bg-customLightGray rounded-t-md">
        <Button
          className="text-white text-3/4.5 bg-blue h-10 w-29.25 justify-center items-center rounded-tl-md shadow-taskWindowShadow"
          content={firstButton}
        />
      </div>
      <div className="bg-customGray rounded-b-md overflow-auto h-full max-h-20">
        <div className="text-white p-2">
          {content.split("\n").map((line: any, index: any) => (
            <div key={index}>
              {line}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsoleWindow;

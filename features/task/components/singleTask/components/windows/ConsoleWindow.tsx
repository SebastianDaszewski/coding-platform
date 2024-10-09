"use client";

import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useEditorAndQuickTestContext } from "@/context/EditorAndQuickTestContext";
import { Button } from "@/components";

type ConsoleWindowProps = {
  isCodeExecuted: any;
  firstButton: string;
};
const ConsoleWindow: React.FC<ConsoleWindowProps> = ({
  firstButton,
  isCodeExecuted,
}) => {
  const { solution } = useEditorAndQuickTestContext();
  const [modifiedEditorValue, setModifiedEditorValue] = useState([]);

  const { data, refetch } = useQuery({
    queryKey: ["RunCode"],
    queryFn: async () => {
      const response = await fetch("api/RunCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: solution }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const result = await response.json();
        let modifiedValue = result.map((item: any) => {
          if (item.message.startsWith("[")) {
            return item.message.slice(1, -1);
          } else {
            return item.message;
          }
        });
        setModifiedEditorValue(modifiedValue);
        return modifiedValue;
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [isCodeExecuted]);

  return (
    <div>
      <div className="bg-customLightGray rounded-t-md">
        <Button
          className="text-white text-3/4.5 bg-blue h-10 w-29.25 justify-center items-center rounded-tl-md shadow-taskWindowShadow"
          content={firstButton}
        />
      </div>
      <div className="bg-customGray rounded-b-md overflow-auto h-20 text-white p-2">
        {isCodeExecuted &&
          modifiedEditorValue.map((line: any, index: any) => (
            <div key={index}>{line}</div>
          ))}
      </div>
    </div>
  );
};

export default ConsoleWindow;

"use client";
import React from "react";

import { white } from "@/styles/colors";
import { SettingsIcon } from "@/sidebarIcons";
import { Button } from "@/components";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@/icons";

const PaginationBar = () => {
  const paginationButtons = [
    {
      name: "doubleLeft",
      element: <DoubleArrowLeftIcon fill="none" size="20" />,
    },
    {
      name: "left",
      element: <ArrowLeftIcon fill="none" size="25" />,
    },

    {
      name: "actual",
      element: (
        <div className="bg-blue text-white h-full flex items-center px-4 font-medium transform-none">
          1/20
        </div>
      ),
    },
    {
      name: "right",
      element: <DoubleArrowRightIcon fill="none" size="20" />,
    },
    {
      name: "doubleRight",
      element: <ArrowRightIcon fill="none" size="25" />,
    },
  ];

  return (
    <div className="h-10 bg-customGray flex justify-between rounded-md">
      <div className="flex items-center gap-4 ml-3">
        {paginationButtons.map(({ name, element }) => (
          <React.Fragment key={name}>
            <button className="flex h-full items-center">{element}</button>
          </React.Fragment>
        ))}
      </div>
      <div className="flex p-2">
        <Button
          className="mr-2 ml-4 transform transition-transform duration-300 hover:scale-150"
          content={<SettingsIcon fill={white} />}
        />
      </div>
    </div>
  );
};

export default PaginationBar;

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { ToolTip, Divider, Icon } from "@/components";

type SidebarLinkProps = {
  text: string;
  href: string;
  tooltip: string;
  iconName: string;
  fullMenuView: boolean;
  fill: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  text,
  href,
  tooltip,
  iconName,
  fullMenuView,
  fill,
}) => {
  const [transformScale, setTransformScale] = useState(false);

  return (
    <div
      className="group justify-center w-55 ml-4"
      onMouseEnter={() => setTransformScale(true)}
      onMouseLeave={() => setTransformScale(false)}
    >
      <Link href={href} className="flex items-center">
        {fullMenuView ? (
          <>
            <div
              className={clsx({
                "transition-transform transform scale-150": transformScale,
              })}
            >
              <Icon iconName={iconName} fill={fill} />
            </div>
            <span
              className={clsx("text-sm ml-7", {
                hidden: !fullMenuView,
                "text-orange": fill === "orange",
                "text-white": fill === "white",
              })}
            >
              {text}
            </span>
          </>
        ) : (
          <>
            <ToolTip tooltip={tooltip}>
              <div
                className={clsx({
                  "transition-transform transform scale-150": transformScale,
                })}
              >
                <Icon iconName={iconName} fill={fill} />
              </div>
            </ToolTip>
          </>
        )}
      </Link>
      <Divider
        margin="mt-5 -ml-4"
        color="gray-700"
        width={fullMenuView ? "55" : "15"}
        hidden={iconName !== "AdminIcon" && iconName !== "JsTasksListIcon"}
      />
    </div>
  );
};

export default SidebarLink;

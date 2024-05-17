"use client";

import React from "react";
import clsx from "clsx";

import { white } from "@/styles/colors";
import { iconSize } from "@/styles/sizes";

type IconWrapperProps = {
  fill?: string;
  size?: string;
  stroke?: string;
  children?: React.ReactNode;
  scale?: boolean;
  rotate?: string;
  id?: string;
};

const IconWrapper = ({
  fill = white,
  size = iconSize,
  stroke = "none",
  scale = true,
  children,
  rotate = "none",
  id = "",
}: IconWrapperProps) => {
  const applyPropsToChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        let svgChildrenWithProps;
        if (child.props.children) {
          svgChildrenWithProps = applyPropsToChildren(child.props.children);
        }
        if (child.type === "path" && stroke !== "none") {
          return React.cloneElement(child as React.ReactElement, {
            stroke,
          });
        }
        return React.cloneElement(child as React.ReactElement, {
          width: size,
          height: size,
          fill: fill,
          children: svgChildrenWithProps,
        });
      }
      return child;
    });
  };

  const childrenWithProps = applyPropsToChildren(children);

  return (
    <div
      className={clsx({
        "transition-transform duration-300 hover:scale-150": scale,
        "rotate-90": rotate === "90",
        "rotate-180": rotate === "180",
        "rotate-270": rotate === "270",
      })}
      id={id}
    >
      {childrenWithProps}
    </div>
  );
};

export default IconWrapper;

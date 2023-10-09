import React from "react";

import { iconSize } from "@/styles/sizes";

type IconWrapperProps = {
  fill?: string;
  size?: string;
  children?: React.ReactNode;
};

const IconWrapper: React.FC<IconWrapperProps> = ({
  fill = "white",
  size = `${iconSize}`,
  children,
}) => {
  const applyPropsToChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        let svgChildrenWithProps;

        if (child.props.children) {
          svgChildrenWithProps = applyPropsToChildren(child.props.children);
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

  return <div>{childrenWithProps}</div>;
};

export default IconWrapper;

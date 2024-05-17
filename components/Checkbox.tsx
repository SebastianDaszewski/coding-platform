"use client";

import React from "react";

import TextLink from "./TextLink";

type CheckboxProps = {
  label: string;
  linkName?: string;
  href?: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ onChange, label, linkName, href, errorMessage, ...restProps }, ref) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-4 items-center h-5">
        <input
          onChange={onChange}
          {...restProps}
          ref={ref}
          id="remember"
          type="checkbox"
          className="w-4 h-4 border rounded focus:ring-3 focus:ring-blue bg-gray-700 border-gray-600 cursor-pointer checked:bg-blue"
        />
        <label htmlFor="remember" className="text-sm font-normal text-white">
          {href && linkName ? (
            <TextLink text={label} linkName={linkName} href={href} />
          ) : (
            label
          )}
        </label>
      </div>
      <div className="flex-inline">
        {errorMessage && (
          <p className="absolute text-xs/4.5 font-extralight text-red">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Checkbox);

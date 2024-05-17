import clsx from "clsx";
import React from "react";

type InputLoggedOutProps = {
  label: string;
  type: "email" | "text" | "password";
  placeholder?: string;
  errorMessage?: string;
  id: string;
  width: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const InputLoggedOut: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputLoggedOutProps
> = (
  {
    value,
    onChange,
    label,
    type,
    placeholder,
    errorMessage,
    id,
    width,
    ...restProps
  },

  ref
) => {
  return (
    <>
      <label className="text-sm/5.25 font-medium text-white">{label}</label>
      <input
        value={value}
        onChange={onChange}
        {...restProps}
        ref={ref}
        type={type}
        id={id}
        className={clsx(
          width,
          "h-10.5 bg-gray-700 border border-gray-600 text-white text-sm/4.375 font-normal rounded-lg focus:ring-blue focus:border-blue py-3 px-4",
          {
            "border-red": errorMessage,
          }
        )}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="absolute text-xs/4.5 font-extralight text-red">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default React.forwardRef(InputLoggedOut);

import React from "react";

type ButtonProps = {
  onClick?: () => void;
  content: any;
  className: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  content,
  className,
  disabled,
}) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;

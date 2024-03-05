import clsx from "clsx";

type DividerProps = {
  width?: string;
  color?: string;
  hidden?: boolean;
};

const Divider: React.FC<DividerProps> = ({
  width = "full",
  color = "white",
  hidden = false,
}) => {
  const dividerClasses = clsx("mt-5 -ml-4 h-0.25", `bg-${color}`, { hidden });

  return (
    <div
      className={clsx(dividerClasses, width !== "full" && `w-${width}`)}
    ></div>
  );
};

export default Divider;

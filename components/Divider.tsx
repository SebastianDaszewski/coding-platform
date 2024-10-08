import clsx from "clsx";

type DividerProps = {
  width?: string;
  color?: string;
  hidden?: boolean;
  height?: string;
  margin?: string;
};

const Divider: React.FC<DividerProps> = ({
  width = "full",
  color = "white",
  hidden = false,
  height = "h-0.25",
  margin,
}) => {
  const dividerClasses = clsx(`${height} bg-${color}`, {
    hidden,
  });

  return (
    <div
      className={clsx(
        dividerClasses,
        margin,
        width !== "full" && `w-${width} transition-all duration-150`
      )}
    ></div>
  );
};

export default Divider;

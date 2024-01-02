import { ReactNode, useRef, useState } from "react";

type TooltipProps = {
  children: ReactNode;
  tooltip?: string;
};
const ToolTip: React.FC<TooltipProps> = ({ children, tooltip }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div
      ref={container}
      onMouseEnter={() => setTooltipOpen(true)}
      className="group relative inline-block"
    >
      {children}
      {tooltipOpen ? (
        <div>
          <span
            ref={tooltipRef}
            className="invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-white text-black text-sm/3.5 h-10 w-30 rounded absolute -top-2 left-10 flex items-center justify-center"
          >
            {tooltip}
          </span>
          <div
            className=" opacity-0 group-hover:opacity-100 absolute top-2 left-9 bg-white"
            data-popper-arrow
          ></div>
        </div>
      ) : null}
    </div>
  );
};

export default ToolTip;

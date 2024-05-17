import { IconWrapper } from "@/components";

import { SvgProps } from "./iconTypes";

const PlusIcon: React.FC<SvgProps> = ({ size, fill }) => (
  <IconWrapper size={size} fill={fill}>
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 1V6M6.5 6V11M6.5 6H11.5M6.5 6H1.5"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export default PlusIcon;

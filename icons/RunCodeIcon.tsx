import { IconWrapper } from "@/components";

import { SvgProps } from "./iconTypes";

const RunCodeIcon: React.FC<SvgProps> = ({ size, fill }) => (
  <IconWrapper size={size} fill={fill}>
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 4.71072C4.25 3.52228 5.52417 2.7689 6.5655 3.34163L16.1827 8.63107C17.262 9.2247 17.262 10.7756 16.1827 11.3692L6.5655 16.6587C5.52416 17.2314 4.25 16.478 4.25 15.2896V4.71072Z"
      />
    </svg>
  </IconWrapper>
);

export default RunCodeIcon;

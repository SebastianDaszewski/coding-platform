import { IconWrapper } from "@/components";

import { SvgProps } from "./iconTypes";

const SendCodeIcon: React.FC<SvgProps> = ({ size, fill }) => (
  <IconWrapper size={size} fill={fill}>
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1.3335H11.8333H1ZM1 4.66683H8.5H1ZM1 8.00016H6H1ZM9.33333 8.00016L12.6667 4.66683L9.33333 8.00016ZM12.6667 4.66683L16 8.00016L12.6667 4.66683ZM12.6667 4.66683V14.6668V4.66683Z" />
      <path
        d="M12.6667 4.66683V14.6668M1 1.3335H11.8333H1ZM1 4.66683H8.5H1ZM1 8.00016H6H1ZM9.33333 8.00016L12.6667 4.66683L9.33333 8.00016ZM12.6667 4.66683L16 8.00016L12.6667 4.66683Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export default SendCodeIcon;

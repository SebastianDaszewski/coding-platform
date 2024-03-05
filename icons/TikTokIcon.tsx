import { IconWrapper } from "@/components";

import { SvgProps } from "./iconTypes";

const TikTokIcon: React.FC<SvgProps> = ({ fill, size }) => (
  <IconWrapper fill={fill} size={size}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.3817 0H8.6852V10.8985C8.6852 12.1971 7.64812 13.2638 6.3575 13.2638C5.06689 13.2638 4.02979 12.1971 4.02979 10.8985C4.02979 9.6232 5.04384 8.57969 6.28838 8.53333V5.79711C3.54581 5.84347 1.33333 8.09276 1.33333 10.8985C1.33333 13.7276 3.5919 16 6.38056 16C9.16918 16 11.4277 13.7044 11.4277 10.8985V5.31013C12.4418 6.05218 13.6863 6.49276 15 6.51596V3.77971C12.9719 3.71015 11.3817 2.04058 11.3817 0Z"
        fill={fill}
      />
    </svg>
  </IconWrapper>
);

export default TikTokIcon;

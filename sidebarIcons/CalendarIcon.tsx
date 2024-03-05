type CalendarIconProps = {
  fill: string;
};

const CalendarIcon: React.FC<CalendarIconProps> = ({ fill }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M1.73223 1.73223C1.26339 2.20107 1 2.83696 1 3.5V6C1 6.66304 1.26339 7.29893 1.73223 7.76777C2.20107 8.23661 2.83696 8.5 3.5 8.5H6C6.66304 8.5 7.29893 8.23661 7.76777 7.76777C8.23661 7.29893 8.5 6.66304 8.5 6V3.5C8.5 2.83696 8.23661 2.20107 7.76777 1.73223C7.29893 1.26339 6.66304 1 6 1H3.5C2.83696 1 2.20107 1.26339 1.73223 1.73223Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2322 1.73223C13.7634 2.20107 13.5 2.83696 13.5 3.5V6C13.5 6.66304 13.7634 7.29893 14.2322 7.76777C14.7011 8.23661 15.337 8.5 16 8.5H18.5C19.163 8.5 19.7989 8.23661 20.2678 7.76777C20.7366 7.29893 21 6.66304 21 6V3.5C21 2.83696 20.7366 2.20107 20.2678 1.73223C19.7989 1.26339 19.163 1 18.5 1H16C15.337 1 14.7011 1.26339 14.2322 1.73223Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.73223 14.2322C1.26339 14.7011 1 15.337 1 16V18.5C1 19.163 1.26339 19.7989 1.73223 20.2678C2.20107 20.7366 2.83696 21 3.5 21H6C6.66304 21 7.29893 20.7366 7.76777 20.2678C8.23661 19.7989 8.5 19.163 8.5 18.5V16C8.5 15.337 8.23661 14.7011 7.76777 14.2322C7.29893 13.7634 6.66304 13.5 6 13.5H3.5C2.83696 13.5 2.20107 13.7634 1.73223 14.2322Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2322 14.2322C13.7634 14.7011 13.5 15.337 13.5 16V18.5C13.5 19.163 13.7634 19.7989 14.2322 20.2678C14.7011 20.7366 15.337 21 16 21H18.5C19.163 21 19.7989 20.7366 20.2678 20.2678C20.7366 19.7989 21 19.163 21 18.5V16C21 15.337 20.7366 14.7011 20.2678 14.2322C19.7989 13.7634 19.163 13.5 18.5 13.5H16C15.337 13.5 14.7011 13.7634 14.2322 14.2322Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CalendarIcon;

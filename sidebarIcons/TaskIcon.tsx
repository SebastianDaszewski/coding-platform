type TaskIconProps = {
  fill: string;
};

const TaskIcon: React.FC<TaskIconProps> = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M6.66665 4.16667H4.99998C4.55795 4.16667 4.13403 4.34226 3.82147 4.65482C3.50891 4.96738 3.33331 5.39131 3.33331 5.83333V15.8333C3.33331 16.2754 3.50891 16.6993 3.82147 17.0118C4.13403 17.3244 4.55795 17.5 4.99998 17.5H13.3333C13.7753 17.5 14.1993 17.3244 14.5118 17.0118C14.8244 16.6993 15 16.2754 15 15.8333V15M6.66665 4.16667C6.66665 4.60869 6.84224 5.03262 7.1548 5.34518C7.46736 5.65774 7.89129 5.83333 8.33331 5.83333H9.99998C10.442 5.83333 10.8659 5.65774 11.1785 5.34518C11.4911 5.03262 11.6666 4.60869 11.6666 4.16667M6.66665 4.16667C6.66665 3.72464 6.84224 3.30072 7.1548 2.98816C7.46736 2.67559 7.89129 2.5 8.33331 2.5H9.99998C10.442 2.5 10.8659 2.67559 11.1785 2.98816C11.4911 3.30072 11.6666 3.72464 11.6666 4.16667M11.6666 4.16667H13.3333C13.7753 4.16667 14.1993 4.34226 14.5118 4.65482C14.8244 4.96738 15 5.39131 15 5.83333V8.33333M16.6666 11.6667H8.33331M8.33331 11.6667L10.8333 9.16667M8.33331 11.6667L10.8333 14.1667"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TaskIcon;
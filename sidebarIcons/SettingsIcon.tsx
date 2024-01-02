type ContentProps = {
  fill: string;
};

const SettingsIcon: React.FC<ContentProps> = ({ fill }) => {
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
          d="M11.3958 3.5975C11.0408 2.13417 8.95917 2.13417 8.60417 3.5975C8.37417 4.54333 7.29083 4.99167 6.46083 4.485C5.17417 3.70167 3.7025 5.17417 4.48583 6.46C4.60359 6.65313 4.67407 6.87133 4.69156 7.09685C4.70904 7.32236 4.67303 7.54882 4.58645 7.75779C4.49988 7.96676 4.36518 8.15233 4.19333 8.29941C4.02148 8.44648 3.81733 8.5509 3.5975 8.60417C2.13417 8.95917 2.13417 11.0408 3.5975 11.3958C3.81714 11.4492 4.02107 11.5537 4.19273 11.7008C4.36438 11.8479 4.49892 12.0333 4.58539 12.2422C4.67187 12.451 4.70785 12.6773 4.6904 12.9027C4.67296 13.1281 4.60258 13.3461 4.485 13.5392C3.70167 14.8258 5.17417 16.2975 6.46 15.5142C6.65313 15.3964 6.87133 15.3259 7.09685 15.3084C7.32236 15.291 7.54882 15.327 7.75779 15.4135C7.96676 15.5001 8.15233 15.6348 8.29941 15.8067C8.44648 15.9785 8.5509 16.1827 8.60417 16.4025C8.95917 17.8658 11.0408 17.8658 11.3958 16.4025C11.4492 16.1829 11.5537 15.9789 11.7008 15.8073C11.8479 15.6356 12.0333 15.5011 12.2422 15.4146C12.451 15.3281 12.6773 15.2922 12.9027 15.3096C13.1281 15.327 13.3461 15.3974 13.5392 15.515C14.8258 16.2983 16.2975 14.8258 15.5142 13.54C15.3964 13.3469 15.3259 13.1287 15.3084 12.9032C15.291 12.6776 15.327 12.4512 15.4135 12.2422C15.5001 12.0332 15.6348 11.8477 15.8067 11.7006C15.9785 11.5535 16.1827 11.4491 16.4025 11.3958C17.8658 11.0408 17.8658 8.95917 16.4025 8.60417C16.1829 8.55075 15.9789 8.44627 15.8073 8.29921C15.6356 8.15215 15.5011 7.96666 15.4146 7.75782C15.3281 7.54897 15.2922 7.32267 15.3096 7.09731C15.327 6.87195 15.3974 6.65388 15.515 6.46083C16.2983 5.17417 14.8258 3.7025 13.54 4.48583C13.3469 4.60359 13.1287 4.67407 12.9032 4.69156C12.6776 4.70904 12.4512 4.67303 12.2422 4.58645C12.0332 4.49988 11.8477 4.36518 11.7006 4.19333C11.5535 4.02148 11.4491 3.81733 11.3958 3.5975Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default SettingsIcon;

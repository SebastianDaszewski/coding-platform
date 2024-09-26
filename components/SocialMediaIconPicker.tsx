import Link from "next/link";

import { GithubIcon, LinkedinIcon } from "@/icons";

type SocialMediaIconPickerProps = {
  url: string;
};

const SocialMediaIconPicker: React.FC<SocialMediaIconPickerProps> = ({
  url,
}) => {
  let iconUrl: React.ReactElement;

  switch (true) {
    case url.includes("linkedin.com"):
      iconUrl = <LinkedinIcon />;
      break;
    case url.includes("github.com"):
      iconUrl = <GithubIcon />;
      break;
    default:
      iconUrl = <GithubIcon />;
  }

  return (
    <Link href={url} target="_blank">
      {iconUrl}
    </Link>
  );
};

export default SocialMediaIconPicker;

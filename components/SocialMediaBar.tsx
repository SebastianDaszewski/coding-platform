import { SocialMediaIconPicker } from "./index";

const SocialMediaBar = () => {
  const socialMediasUrls: string[] = [
    "https://www.linkedin.com/in/sebastian-daszewski-b85b26246/",
    "https://github.com/SebastianDaszewski",
  ];

  return (
    <div className="flex h-10 items-center bg-black relative">
      <div className="w-screen h-10 flex justify-end items-center gap-8 mx-10">
        {socialMediasUrls.map((url: string) => (
          <SocialMediaIconPicker url={url} key={url} />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;

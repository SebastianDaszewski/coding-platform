import SocialMediaIconPicker from "./SocialMediaIconPicker";

const SocialMediaBar = () => {
  const socialMediasUrls: string[] = [
    "https://www.facebook.com/groups/3792300160870421",
    "https://www.instagram.com/devstock.pl/",
    "https://www.linkedin.com/company/devstockspzoo/mycompany/",
    "https://www.youtube.com/@devstock",
    "https://github.com/Devstock-Academy",
    "https://www.tiktok.com/@devstockacademy",
  ];

  return (
    <div className="flex h-10 items-center bg-black relative">
      <div className="w-screen h-10 flex justify-end items-center gap-8 pr-6">
        {socialMediasUrls.map((url: string) => (
          <SocialMediaIconPicker url={url} key={url} />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;

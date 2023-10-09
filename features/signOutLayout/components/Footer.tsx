import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("TopBar");

  return (
    <nav className="w-screen text-white">
      <div className="h-20 flex flex-wrap items-center text-center justify-between ml-10 mr-10">
        <div className="flex">
          <span className="mr-5">Devstock.pl</span>
          <span className="mr-5">|</span>
          <span className="mr-5">{t("privacyPolicy")}</span>
          <span className="mr-5 ml-5">|</span>
          <span>{t("contact")}</span>
        </div>
        <div>
          <div>💛 Devstock © 2023</div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

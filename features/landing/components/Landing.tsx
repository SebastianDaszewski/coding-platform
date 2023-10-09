"use client";

import { useTranslations } from "next-intl";

import SignOutLayout from "@/features/signOutLayout/layout";

import Content from "./Content";

const Landing = () => {
  const t = useTranslations("Content");

  return (
    <div className="flex flex-col h-full">
      <SignOutLayout>
        <Content
          texts={{
            contentFirstParagraph: t("contentFirstParagraph"),
            contentSecondParagraph: t("contentSecondParagraph"),
            cardTitle: t("cardTitle"),
            cardText: t("cardText"),
            cardButton: t("cardButton"),
          }}
        />
      </SignOutLayout>
    </div>
  );
};

export default Landing;

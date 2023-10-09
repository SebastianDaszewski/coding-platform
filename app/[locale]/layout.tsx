import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Lexend_Deca } from "next/font/google";

import "./globals.css";

const lexend = Lexend_Deca({
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }];
}

export const metadata = {
  title: "Codebusters",
  description: "Created by Devstock",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={lexend.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Lexend_Deca } from "next/font/google";
import Providers from "@/providers/Providers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import "./globals.css";

const lexend = Lexend_Deca({
  subsets: ["latin"],
});

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
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <html>
      <Providers>
        <body className={lexend.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </Providers>
    </html>
  );
}

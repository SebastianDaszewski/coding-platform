"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditorAndQuickTestProvider } from "@/context";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EditorAndQuickTestProvider>
        <SessionProvider>{children}</SessionProvider>
      </EditorAndQuickTestProvider>
    </QueryClientProvider>
  );
};

export default Providers;

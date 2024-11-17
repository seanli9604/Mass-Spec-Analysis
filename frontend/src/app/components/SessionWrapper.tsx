"use client";

import { SessionProvider } from "next-auth/react";
import { UserContextProvider } from "../context/UserContext"

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </SessionProvider>
  );
}

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavButtons() {
  const { status } = useSession();

  return (
    <>
      <Link href="/" className="text-gray-700 hover:text-gray-900 mr-6">
        Home
      </Link>
      {
        status === "authenticated" &&
        <Link href="/api" className="text-gray-700 hover:text-gray-900 mr-6">
          API
        </Link>
      }
      <Link href="/about" className="text-gray-700 hover:text-gray-900 mr-6">
        About
      </Link>
      <Link href="/login" className="text-gray-700 hover:text-gray-900">
        {status === "authenticated" ? "Account" : "Login"}
      </Link>
    </>
  );
}
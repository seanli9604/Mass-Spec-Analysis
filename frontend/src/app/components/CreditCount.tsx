"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useUserContext } from '../context/UserContext';

export default function CreditCount() {
  const { credits, fetchCredits } = useUserContext();

  useEffect(() => {
    fetchCredits(); // Fetch credits on mount
  }, [fetchCredits]);

  return (
    <>
      <Link href="/login" className="text-gray-500 hover:underline">
        {credits} credit{credits !== 1 ? "s" : ""}
      </Link>
    </>
  );
}
"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import RiseLoader from "react-spinners/RiseLoader";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign-in failed", error);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign-out failed", error);
      setIsLoading(false);
    }
  };

  console.log(status);

  return (
    <div className="flex justify-center">
      <div className="border border-gray-300 p-4 w-1/3">
        <h3 className="text-2xl text-center font-semibold mb-6">Login</h3>
        {(status === "loading" || isLoading) ? (
          <RiseLoader color="#848484" size="5px" className="mt-6 mb-2" />
        ) : status === "unauthenticated" ? (
          <button
            onClick={handleSignIn}
            className="block w-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 text-center align-middle"
          >
            Login with Google
          </button>
        ) : (
          <>
            <p className="mb-4">
              You are logged in as {session?.user?.name}
            </p>
            <button
              onClick={handleSignOut}
              className="block w-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 text-center align-middle"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import RiseLoader from "react-spinners/RiseLoader";
import { useUserCredits } from '../context/UserContext';
import BuyToken from "../components/BuyToken";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { credits, fetchCredits } = useUserCredits();

  useEffect(() => {
    fetchCredits(); // Fetch credits on mount
  }, [fetchCredits]);

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

  return (
    <div className="flex justify-center">
      <div className="border border-gray-300 p-4 w-1/3">
        <h3 className="text-2xl text-center font-semibold mb-6">
          { status === "unauthenticated" ? "Login" : "Account Management"}
        </h3>
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
            <hr className="border-top border-gray-300 mx-16" />
            <div className="flex justify-center">
              <div className="p-2 w-3/5 mb-2">
                <h4 className="text-xl text-center font-semibold mb-2">Credits</h4>
                <p className="mb-2">
                  You have {credits} credit{credits !== 1 ? "s" : ""}
                </p>
                <BuyToken />
              </div>
            </div>
            <hr className="border-top border-gray-300 mx-16 mb-4" />
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

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import RiseLoader from "react-spinners/RiseLoader";

export default function LoginPage() {
  const { data: session, status } = useSession();

  console.log(status);
  
  return (
    <div className="flex justify-center">
      <div className="border border-gray-300 p-4 w-1/3">
        <h3 className="text-2xl text-center font-semibold mb-6">Login</h3>
        {status === "loading" ? (
          <RiseLoader color="#848484" size="5px" className="mt-6 mb-2" />
        ) : status === "unauthenticated" ? (
          <button
            onClick={() => signIn("google")}
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
              onClick={() => signOut()}
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

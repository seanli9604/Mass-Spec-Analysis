"use client";

import { useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";

export default function ApiPage() {
  const { apiToken, fetchApiToken, regenApiToken } = useUserContext();

  useEffect(() => {
    fetchApiToken();
  }, [fetchApiToken]);
  
  return (
    <div className="container mx-auto px-4 w-3/4 text-left">
      <h2 className="text-3xl text-center font-bold mb-6">API Usage</h2>

      {/* Token management */}
      <div className="flex flex-row justify-center mb-10">
        <div className="border border-gray-300 p-4 w-1/2">
          <h3 className="text-2xl text-center font-semibold mb-6">
            API Token
          </h3>
          <p>Your API token is:</p>
          <div className="flex items-center justify-between border border-gray-300 mx-2 my-2 px-2">
            <p className="flex-grow font-mono text-gray-600 overflow-scroll">
              {apiToken}
            </p>
            <button
              className="min-w-max text-gray-600 active:text-gray-400 py-1"
              onClick={() => { navigator.clipboard.writeText(apiToken ?? "") }}
            >
              <FaCopy />
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            You can generate a new token by clicking the following button.
            Please note that this will invalidate your old token.
          </p>
          <div className="flex justify-center">
            <button
                className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-1/3 min-w-fit text-center mt-2"
                onClick={regenApiToken}
            >
                Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* API docs */}
      <h3 className="text-2xl text-center font-semibold mb-6">
        API Documentation
      </h3>
      <p>
        API endpoints are located at `/api/&lt;endpoint&gt;`. Include the API token as part of the request `Authorization` header as `Bearer: &lt;token&gt;`.
      </p>
    </div>
  );
}
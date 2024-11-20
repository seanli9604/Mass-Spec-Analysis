"use client";

import { FaCopy } from "react-icons/fa";

export default function ApiPage() {
  const token = "TOKEN"
  
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
              {token}
            </p>
            <button
              className="min-w-max text-gray-600 active:text-gray-400"
              onClick={() => { navigator.clipboard.writeText(token) }}
            >
              <FaCopy />
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            You can generate a new token by clicking the following button.
            Please note that this will invalidate your old token.
          </p>
          <button
              className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-full text-center mt-2"
              onClick={() => {}}
          >
              Regenerate
          </button>
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
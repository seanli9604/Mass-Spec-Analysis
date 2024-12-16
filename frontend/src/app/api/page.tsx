"use client";

// import { useEffect } from "react";
import { FaCopy } from "react-icons/fa";
// impyort { useUserContext } from "../context/UserContext";

export default function ApiPage() {
  // const { fetchApiToken, regenApiToken } = useUserContext();

  const apiToken = "DD64EBB9IT6YE656WSMUEA034GLJNWNB4QKPSOIA" 

  // useEffect(() => {
  //   fetchApiToken();
  // }, [fetchApiToken]);
  // useEffect(() => {
    //   fetchApiToken();
    // }, [fetchApiToken]);
    
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
                onClick={() => alert("Token regeneration not implemented.")}
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
      <h4 className="text-xl font-semibold mb-2">
        Access
      </h4>
      <p className="mb-6">
        API endpoints are located at <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">/api/&lt;endpoint&gt;</span>.
        Include the API token as part of the request <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">Authorization</span> header as <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">Bearer &lt;token&gt;</span>.
      </p>
      <h4 className="text-xl font-semibold mb-2">
        Endpoints
      </h4>
      <ul className="mb-12">
        <li className="flex flex-row mb-4">
          <div className="min-w-fit mr-4">
            <span className="font-mono text-sm">POST</span> <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">/process</span>:
          </div>
          <p>
            Processes a mass spectrometry file and returns a list of SMILES codes as possible results. The body of the request should take the form of a JSON object with keys{" "}
            <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">data</span>{" "}
            (a string corresponding to the contents of the file) and{" "}
            <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">filename</span>{" "}
            (a string; the file extension of which determines how the engine will interpret the filetype).
            Accepted file extensions are{" "}
            <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">*.txt</span> &mdash; MassBank,{" "}
            <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">*.jdx</span> &mdash; JCAMP-DX,{" "}
            <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">*.csv</span> &mdash; CSV).
            A successful request to this endpoint will deduct one credit from the account associated with the API token.
            Credits will not be deducted if the request is ill-formed or unsuccessful (e.g. if the engine is unable to return any results).
          </p>
        </li>
        <li className="flex flex-row mb-4">
          <div className="min-w-fit mr-4">
            <span className="font-mono text-sm">&nbsp;GET</span> <span className="border border-gray-300 px-1 text-gray-600 font-mono text-sm inline-block">/credits</span>:
          </div>
          <p>
            Returns the number of remaining credits in the account associated with the API token.
          </p>
        </li>
      </ul>

      {/* Examples */}
      <h3 className="text-2xl text-center font-semibold mb-6">
        Example Usage
      </h3>
      {/* TODO */}
    </div>
  );
}
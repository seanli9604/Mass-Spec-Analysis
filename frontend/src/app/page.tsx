"use client";

import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header */}
      <header className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center overflow-hidden">
            <div className="w-10 h-10 bg-gray-300 mr-3"></div>
            <h1 className="text-xl font-bold">Company Name</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/about" className="text-gray-700 hover:text-gray-900">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Try our demo</h2>
        <div className="border border-gray-300 p-4 w-1/3 mx-auto text-left">
          <label htmlFor="file-upload" className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 mb-4 text-center">
            Upload File
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="mt-2">
            {selectedFile ? (
              <div className="flex items-center">
                <span className="mr-2 truncate flex-grow">{selectedFile.name}</span>
                <button
                  onClick={handleClearFile}
                  className="border border-gray-300 px-2 py-1 hover:bg-gray-100 cursor-pointer ml-auto"
                >
                  &times;
                </button>
              </div>
            ) : (
              <span className="text-gray-500">No file selected</span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
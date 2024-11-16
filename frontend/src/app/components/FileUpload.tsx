"use client";

import { useState } from 'react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    onFileChange(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="border border-gray-300 p-4 w-1/3 mx-auto text-left">
      <label
        htmlFor="file-upload"
        className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 mb-4 text-center"
      >
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mt-2 flex items-center overflow-hidden">
        {selectedFile ? (
          <>
            <span className="mr-2 truncate flex-grow">{selectedFile.name}</span>
            <button
              onClick={handleClearFile}
              className="border border-gray-300 px-2 py-1 hover:bg-gray-100 cursor-pointer ml-auto"
            >
              &times;
            </button>
          </>
        ) : (
          <span className="text-gray-500">No file selected</span>
        )}
      </div>
    </div>
  );
}
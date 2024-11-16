"use client";

import { useState, useEffect } from 'react';
import { SmilesSvgRenderer } from 'react-ocl';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMolecule, setShowMolecule] = useState(false);
  const [smiles, setSmiles] = useState("Cn1cnc2c1c(=O)n(C)c(=O)n2C");
  const [iupacName, setIupacName] = useState<string>("");

  useEffect(() => {
    if (showMolecule) {
      fetch('/api/iupac', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smiles }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIupacName(data.iupacName);
        })
        .catch((error) => {
          console.error('Error fetching IUPAC name:', error);
          setIupacName("");
        });
    }
  }, [showMolecule, smiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setShowMolecule(true);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setShowMolecule(false);
    setIupacName("");
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
          <div className="flex items-center">
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

        {/* Visualization Box */}
        {showMolecule && (
          <div className="border border-gray-300 p-4 w-1/3 mx-auto mt-8">
            <h3 className="text-xl font-bold mb-4">Molecular Structure</h3>
            <div className="flex justify-center">
              <SmilesSvgRenderer smiles={smiles} />
            </div>
            {iupacName && (<p className="text-gray-700 mt-4">{iupacName}</p>)}
          </div>
        )}
      </main>
    </div>
  );
}
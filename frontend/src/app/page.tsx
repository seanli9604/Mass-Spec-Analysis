"use client";

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

export default function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [smilesArr, setSmilesArr] = useState<string[]>(
    [
      // "Cn1cnc2c1c(=O)n(C)c(=O)n2C", // caffeine
      // "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](CO)O[C@H](CO)O2)[C@@H](O)[C@H](O)[C@H]1O", // sugar
    ]
    );

    const handleFileChange = async (file: File | null) => {
      if (file) {
        setShowResults(false); // Reset results while loading
    
        try {
          const fileContent = await file.text();
          const payload = JSON.stringify({
            data: fileContent,
          });
    
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/analyse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
          });
    
          if (!response.ok) {
            throw new Error('Failed to analyse file');
          }
    
          const data = await response.json(); // Assuming backend returns { smiles: string[] }
          setSmilesArr(data || []);
          setShowResults(true); // Show results after successful fetch
        } catch (error) {
          console.error("Error during analysis:", error);
          setSmilesArr([]); // Clear results on error
          setShowResults(false);
        }
      }
    };
    

  console.log(setSmilesArr);

  return (
    <div className="min-h-screen bg-white font-roboto container mx-auto px-4">
      <header className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 mr-3"></div>
            <h1 className="text-xl font-bold">MoleClue</h1>
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

      <main className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Try our demo</h2>
        <FileUpload onFileChange={handleFileChange} />
        {showResults && <Results smilesArr={smilesArr} />}
      </main>
    </div>
  );
}
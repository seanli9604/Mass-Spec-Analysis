"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import RiseLoader from "react-spinners/RiseLoader";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [showResults, setShowResults] = useState(false);
  const [smilesArr, setSmilesArr] = useState<string[]>(
    [
      // "Cn1cnc2c1c(=O)n(C)c(=O)n2C", // caffeine
      // "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](CO)O[C@H](CO)O2)[C@@H](O)[C@H](O)[C@H]1O", // sugar
    ]
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setShowResults(false); // Reset results while loading
      setLoading(true);
  
      try {
        // if (status !== "authenticated" || !session?.id_token) {
        //   throw new Error('Unauthorised');
        // }

        const fileContent = await file.text();
        const payload = JSON.stringify({
          data: fileContent,
          filename: file.name,
        });
  
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/analyse', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.id_token}`,
            'Content-Type': 'application/json',
          },
          body: payload,
        });
  
        if (!response.ok) {
          throw new Error('Failed to analyse file');
        }
  
        const data = await response.json();
        setSmilesArr(data || []);
      } catch (error) {
        console.error("Error during analysis:", error);
        setSmilesArr([]); // Clear results on error
      }

      setLoading(false);
      setShowResults(true);
    } else {
      setSmilesArr([]);
      setLoading(false);
      setShowResults(false);
    }
  };

  if (status === "authenticated") {
    return (
      <>
        <h2 className="text-3xl font-bold mb-6">Upload Data</h2>
        <FileUpload demo={false} onFileChange={handleFileChange} />
        {showResults && <Results smilesArr={smilesArr} />}
        {loading && <RiseLoader color="#848484" size="5px" className="mt-10" />}
      </>
    );
  } else {
    return (
      <>
        <h2 className="text-3xl font-bold mb-6">Try our demo</h2>
        <FileUpload demo={true} onFileChange={handleFileChange} />
        {showResults && <Results smilesArr={smilesArr} />}
        {loading && <RiseLoader color="#848484" size="5px" className="mt-10" />}
      </>
    );
  }
}
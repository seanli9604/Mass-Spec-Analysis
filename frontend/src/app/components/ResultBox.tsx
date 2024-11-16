"use client";

import { useEffect, useState } from 'react';
import { SmilesSvgRenderer } from 'react-ocl';

interface ResultBoxProps {
  smiles: string;
}

export default function ResultBox({ smiles }: ResultBoxProps) {
  const [iupacName, setIupacName] = useState<string>("");

  useEffect(() => {
    if (smiles) {
      fetch(process.env.NEXT_PUBLIC_API_URL+'/iupac', {
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
  }, [smiles]);

  return (
    <div className="border border-gray-300 p-4 mx-auto mb-4">
      <h3 className="text-xl font-bold mb-4">Molecular Structure</h3>
      <div className="flex justify-center">
        <SmilesSvgRenderer smiles={smiles} />
      </div>
      {iupacName && <p className="text-gray-700 mt-4">{iupacName}</p>}
    </div>
  );
}

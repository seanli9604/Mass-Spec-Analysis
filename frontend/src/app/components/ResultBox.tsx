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
      fetch(`https://cactus.nci.nih.gov/chemical/structure/${encodeURIComponent(smiles)}/iupac_name`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((iupacName) => {
          setIupacName(iupacName.trim());
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

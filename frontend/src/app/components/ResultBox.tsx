"use client";

import { useEffect, useState } from 'react';
import { SmilesSvgRenderer } from 'react-ocl';

interface ResultBoxProps {
  id: number;
  smiles: string;
}

export default function ResultBox({ id, smiles }: ResultBoxProps) {
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
          console.log('Error fetching IUPAC name:', error);
          setIupacName("");
        });
    }
  }, [smiles]);

  return (
    <div className="border border-gray-300 p-4 mx-auto mb-4">
      <h3 className="text-xl font-bold mb-4">Molecular Structure {id+1}</h3>
      <div className="flex justify-center">
        <SmilesSvgRenderer smiles={smiles} />
      </div>
      {iupacName && <p className="text-gray-700 mt-4">{iupacName}</p>}
    </div>
  );
}

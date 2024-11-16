"use client";

import ResultBox from './ResultBox';

interface ResultsProps {
  smilesArr: string[];
}

export default function Results({ smilesArr }: ResultsProps) {
  return (
    <div className="border border-gray-300 p-4 pb-0 w-1/3 mx-auto mt-8">
      {smilesArr.length > 0 ? (
        smilesArr.map((item, index) => (
          <ResultBox key={index} smiles={item} />
        ))
      ) : (
        <p className="text-center pb-4">No results found 🙁</p>
      )}
    </div>
  );
}

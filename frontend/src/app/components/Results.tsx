"use client";

import ResultBox from './ResultBox';

interface ResultsProps {
  smilesArr: string[];
}

export default function Results({ smilesArr }: ResultsProps) {
  function exportResults() {
    const content = smilesArr.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Filename
    const now = new Date();
    const formattedDate = now
      .toISOString()
      .replace('T', '_')
      .replace(/:/g, '-')
      .split('.')[0];
    const filename = `results_${formattedDate}.txt`;

    // Create a dummy <a> element and simulate a click to download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;  // filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  return (
    <div
      className={`w-full sm:w-1/2 lg:w-1/3 mx-auto mt-8 ${
        smilesArr.length === 0 ? 'border border-gray-300 p-4' : ''
      } pb-0`}
    >
      {smilesArr.length > 0 ? (
        <>
          <button
            className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100 mb-4 text-center"
            onClick={exportResults}
          >
            Export Results
          </button>
          {smilesArr.map((item, index) => <ResultBox key={index} id={index} smiles={item} />)}
        </>
      ) : (
        <p className="text-center pb-4">No results found 🙁</p>
      )}
    </div>
  );
}

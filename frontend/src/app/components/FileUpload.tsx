"use client";

import { useEffect, useState, useCallback } from 'react';
import { useUserCredits } from '../context/UserContext';
import { parseMassSpectrum } from '../utils/parseMassSpectrum';
import { getFile, sampleFiles } from '../utils/sampleFiles';
import type { SampleFile } from '../utils/sampleFiles';
import SpectrumChart from './SpectrumChart';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  demo: boolean;
  onFileChange: (file: File | null) => void;
}

export default function FileUpload({ demo, onFileChange }: FileUploadProps) {
  const [peakData, setPeakData] = useState<{ mz: number; intensity: number }[] | null>(null);
  const [parseError, setParseError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { credits, fetchCredits } = useUserCredits();

  useEffect(() => {
    fetchCredits(); // Fetch credits on mount
  }, [fetchCredits]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      handleFileUpload(file);
    }
  };

  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setPeakData(null);
    setParseError(false);

    try {
      const fileContent = await file.text();
      const parsedData = parseMassSpectrum(fileContent);
      if (parsedData.length > 0 && !(Number.isNaN(parsedData[0].mz) && Number.isNaN(parsedData[0].intensity))) {
        setPeakData(parsedData);
      } else {
        setPeakData(null);
        setParseError(true);
      }
      if (demo) {
        onFileChange(file);
      }
    } catch (error) {
      console.error("Error reading or parsing file:", error);
      setParseError(true);
      onFileChange(null);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: true,
    disabled: demo,
  });

  const handleClearFile = () => {
    setSelectedFile(null);
    setPeakData(null);
    setParseError(false);
    onFileChange(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`transition-all duration-300 border border-gray-300 p-4 w-full sm:w-1/2 lg:w-1/3 mx-auto text-left ${
        isDragActive ? 'scale-105' : 'scale-100'
      }`}
    >
      {
        demo ?
        <>
          <p className="mb-2">Select one of our prepared samples:</p>
          {
            sampleFiles.map(({ label, fileIndex }: SampleFile, idx: number) => (
              <button
                key={idx}
                onClick={() => { handleFileUpload(getFile(fileIndex)) }}
                className="block border border-gray-300 w-full px-4 py-1 cursor-pointer hover:bg-gray-100 text-center mb-2"
              >
                {label}
              </button>
            ))
          }
        </>
        :
        <label
          htmlFor="file-upload"
          className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 mb-4 text-center"
        >
          Click or drag to upload file
        </label>
      }
      <input
        {...getInputProps()}
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      {parseError && (
        <p className="text-red-500 text-center">Error parsing file.</p>
      )}
      {peakData && (
        <div className="mt-6">
          <SpectrumChart peakData={peakData} />
        </div>
      )}
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
      {
        !demo && selectedFile && !parseError && (
          credits !== null && credits > 0 && (
            <>
              <p className="text-gray-600 text-sm mt-2">Processing this file will use 1 credit.</p>
              <div className="flex justify-center mt-2" onClick={() => { onFileChange(selectedFile) }}>
                <button className="block border border-gray-300 w-full px-4 py-2 cursor-pointer hover:bg-gray-100 text-center">
                  Process
                </button>
              </div>
            </>
          ) || (
            <>
              <p className="text-red-600 text-sm mt-2">Insufficient credits to process.</p>
              <div className="flex justify-center mt-2" onClick={() => { onFileChange(selectedFile) }}>
                <button disabled className="block border border-gray-300 w-full px-4 py-2 cursor-not-allowed text-gray-400 text-center">
                  Process
                </button>
              </div>
            </>
          )
        )
      }
    </div>
  );
}

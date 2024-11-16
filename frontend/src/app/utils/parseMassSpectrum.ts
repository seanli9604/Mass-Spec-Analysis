export interface PeakData {
  mz: number;
  intensity: number;
}

export function parseMassSpectrum(fileContent: string): PeakData[] {
  if (fileContent.includes('##TITLE=') && fileContent.includes('##JCAMP-DX=')) {
    return parseJCAMPDX(fileContent);
  } else if (fileContent.includes('PK$PEAK:')) {
    return parseMassBank(fileContent);
  } else {
    throw new Error('Unsupported file format');
  }
}

function parseMassBank(fileContent: string): PeakData[] {
  return fileContent
    .split('\n')
    .filter((line) => line.startsWith('  ')) // Find lines with peak data
    .map((line) => line.trim().split(/\s+/)) // Split by whitespace
    .map(([mz, intensity]) => ({
      mz: parseFloat(mz),
      intensity: parseFloat(intensity),
    }));
}

function parseJCAMPDX(fileContent: string): PeakData[] {
  const lines = fileContent.split(/\r?\n/);
  const peaks: PeakData[] = [];

  let parsingPeaks = false;

  for (const line of lines) {
    if (line.startsWith("##PEAK TABLE")) {
      parsingPeaks = true;
      continue;
    }

    if (parsingPeaks) {
      const peakPairs = line.match(/\d+,\d+/g);
      if (peakPairs) {
        for (const pair of peakPairs) {
          const [mz, intensity] = pair.split(",").map(Number);
          peaks.push({ mz, intensity });
        }
      }
    }
  }

  return peaks;
}
export interface PeakData {
  mz: number;
  intensity: number;
}

export function parseMassSpectrum(fileContent: string): PeakData[] {
  return fileContent
    .split('\n')
    .filter((line) => line.startsWith('  ')) // Find lines with peak data
    .map((line) => line.trim().split(/\s+/)) // Split by whitespace
    .map(([mz, intensity]) => ({
      mz: parseFloat(mz),
      intensity: parseFloat(intensity),
    }));
}  
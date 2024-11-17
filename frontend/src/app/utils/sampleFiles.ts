export type SampleFile = {
  label: string;
  fileIndex: number;
};

export const sampleFiles: SampleFile[] = [
  { label: "Mass Spectrum 1", fileIndex: 0 },
];

export function getFile(index: number): File {
  return new File([files[index]], sampleFiles[index].label.replaceAll(" ", "")+".txt", { type: 'text/plain' });
}

const files = [
  `
ACCESSION: MSBNK-CASMI_2016-SM843003
RECORD_TITLE: 3,4-Dichlorophenylurea; LC-ESI-QFT; MS2; CE: 35 NCE; R=35000; [M+H]+
DATE: 2016.12.12
AUTHORS: Krauss M, Schymanski EL, Weidauer C, Schupke H, UFZ and Eawag
LICENSE: CC BY
COPYRIGHT: Copyright (C) 2016 UFZ/Eawag
PUBLICATION: Schymanski, E. L.; Ruttkies, C.; Krauss, M.; Brouard, C.; Kind, T.; Dührkop, K.; Allen, F.; Vaniya, A.; Verdegem, D.; Böcker, S.; et al. Critical Assessment of Small Molecule Identification 2016: Automated Methods. Journal of Cheminformatics 2017, 9 (1). DOI:10.1186/s13321-017-0207-1
COMMENT: CONFIDENCE standard compound
COMMENT: INTERNAL_ID 8430
CH$NAME: 3,4-Dichlorophenylurea
CH$NAME: 1-(3,4-Dichlorophenyl)urea
CH$NAME: (3,4-dichlorophenyl)urea
CH$COMPOUND_CLASS: N/A; Environmental Standard
CH$FORMULA: C7H6Cl2N2O
CH$EXACT_MASS: 203.98572
CH$SMILES: NC(=O)Nc1ccc(Cl)c(Cl)c1
CH$IUPAC: InChI=1S/C7H6Cl2N2O/c8-5-2-1-4(3-6(5)9)11-7(10)12/h1-3H,(H3,10,11,12)
CH$LINK: CAS 8/02/2327
CH$LINK: CHEBI 83464
CH$LINK: PUBCHEM CID:16854
CH$LINK: INCHIKEY CYESCLHCWJKRKM-UHFFFAOYSA-N
CH$LINK: CHEMSPIDER 15972
CH$LINK: COMPTOX DTXSID2041468
AC$INSTRUMENT: Q Exactive Plus Orbitrap Thermo Scientific
AC$INSTRUMENT_TYPE: LC-ESI-QFT
AC$MASS_SPECTROMETRY: MS_TYPE MS2
AC$MASS_SPECTROMETRY: ION_MODE POSITIVE
AC$MASS_SPECTROMETRY: IONIZATION ESI
AC$MASS_SPECTROMETRY: FRAGMENTATION_MODE HCD
AC$MASS_SPECTROMETRY: COLLISION_ENERGY 35  (nominal)
AC$MASS_SPECTROMETRY: RESOLUTION 35000
AC$CHROMATOGRAPHY: COLUMN_NAME Kinetex C18 EVO 2.6 um, 2.1x50 mm, precolumn 2.1x5 mm, Phenomenex
AC$CHROMATOGRAPHY: FLOW_GRADIENT 95/5 at 0 min, 95/5 at 1 min, 0/100 at 13 min, 0/100 at 24 min
AC$CHROMATOGRAPHY: FLOW_RATE 300 uL/min
AC$CHROMATOGRAPHY: RETENTION_TIME 9.313 min
AC$CHROMATOGRAPHY: SOLVENT A water with 0.1% formic acid
AC$CHROMATOGRAPHY: SOLVENT B methanol with 0.1% formic acid
MS$FOCUSED_ION: BASE_PEAK 204.9927
MS$FOCUSED_ION: PRECURSOR_M/Z 204.993
MS$FOCUSED_ION: PRECURSOR_TYPE [M+H]+
MS$DATA_PROCESSING: RECALIBRATE loess on assigned fragments and MS1
MS$DATA_PROCESSING: REANALYZE Peaks with additional N2/O included
MS$DATA_PROCESSING: WHOLE RMassBank 2.3.1
PK$SPLASH: splash10-0w4i-0960000000-ec3ca3af352b79865419
PK$ANNOTATION: m/z tentative_formula formula_count mass error(ppm)
  125.003 C6H4ClN+ 1 125.0027 2.56
  126.0108 C6H5ClN+ 1 126.0105 2
  127.0183 C6H6ClN+ 1 127.0183 -0.12
  132.9605 C5H3Cl2+ 1 132.9606 -1.08
  159.9715 C6H4Cl2N+ 1 159.9715 -0.01
  161.9871 C6H6Cl2N+ 1 161.9872 -0.34
  172.9663 C6H3Cl2N2+ 1 172.9668 -2.81
  187.9664 C7H4Cl2NO+ 1 187.9664 -0.17
  204.993 C7H7Cl2N2O+ 1 204.993 0.12
PK$NUM_PEAK: 9
PK$PEAK: m/z int. rel.int.
  125.003 39591.3 1
  126.0108 38490.1 1
  127.0183 22063012 613
  132.9605 98973.1 2
  159.9715 4046469 112
  161.9871 23044744 640
  172.9663 39172 1
  187.9664 2950785.2 82
  204.993 35927372 999
//
  `,
];
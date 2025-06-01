// Emergency numbers by country/region
const emergencyNumbers = {
  US: "911",
  CA: "911",
  UK: "999",
  AU: "000",
  EU: "112",
  default: "911"
};

const crisisHotlines = {
  US: "988",
  CA: "1-833-456-4566",
  UK: "116 123",
  AU: "13 11 14",
  default: "988"
};

export function getEmergencyNumber(): string {
  // In a real app, this would detect user location
  // For now, defaulting to US numbers
  return emergencyNumbers.US;
}

export function getCrisisHotline(): string {
  // In a real app, this would detect user location
  // For now, defaulting to US crisis hotline
  return crisisHotlines.US;
}

export function getLocationBasedNumbers(countryCode?: string) {
  const code = countryCode || "US";
  return {
    emergency: emergencyNumbers[code as keyof typeof emergencyNumbers] || emergencyNumbers.default,
    crisis: crisisHotlines[code as keyof typeof crisisHotlines] || crisisHotlines.default
  };
}

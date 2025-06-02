// Emergency numbers by country/region
const emergencyData: Record<string, { emergency: string; crisis: string; name: string }> = {
  US: { emergency: "911", crisis: "988", name: "United States" },
  CA: { emergency: "911", crisis: "1-833-456-4566", name: "Canada" },
  GB: { emergency: "999", crisis: "116 123", name: "United Kingdom" },
  AU: { emergency: "000", crisis: "13 11 14", name: "Australia" },
  DE: { emergency: "112", crisis: "0800 111 0 111", name: "Germany" },
  FR: { emergency: "112", crisis: "3114", name: "France" },
  JP: { emergency: "110", crisis: "03-5774-0992", name: "Japan" },
  NZ: { emergency: "111", crisis: "1737", name: "New Zealand" },
  IN: { emergency: "112", crisis: "9152987821", name: "India" },
  BR: { emergency: "190", crisis: "188", name: "Brazil" },
  MX: { emergency: "911", crisis: "800 911 2000", name: "Mexico" },
  ES: { emergency: "112", crisis: "717 003 717", name: "Spain" },
  IT: { emergency: "112", crisis: "02 2327 2327", name: "Italy" },
  NL: { emergency: "112", crisis: "0800 0113", name: "Netherlands" },
  SE: { emergency: "112", crisis: "020 22 00 60", name: "Sweden" },
  NO: { emergency: "112", crisis: "815 33 300", name: "Norway" },
  DK: { emergency: "112", crisis: "70 201 201", name: "Denmark" },
  TH: { emergency: "191", crisis: "1323", name: "Thailand" },
  SG: { emergency: "995", crisis: "1800-221-4444", name: "Singapore" },
  MY: { emergency: "999", crisis: "03-7956-8144", name: "Malaysia" },
  PH: { emergency: "911", crisis: "02-8969191", name: "Philippines" },
  ID: { emergency: "112", crisis: "119", name: "Indonesia" },
  VN: { emergency: "113", crisis: "1800-1567", name: "Vietnam" },
  DEFAULT: { emergency: "112", crisis: "Call Now", name: "International" }
};

export function getEmergencyNumber(): string {
  return emergencyData.US.emergency;
}

export function getCrisisHotline(): string {
  return emergencyData.US.crisis;
}

export function getLocationBasedNumbers(countryCode?: string) {
  return emergencyData[countryCode || "DEFAULT"] || emergencyData.DEFAULT;
}

export function getAllCountries() {
  return Object.entries(emergencyData)
    .filter(([code]) => code !== 'DEFAULT')
    .map(([code, data]) => ({ code, name: data.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function detectUserLocation(): Promise<{ country: string; countryCode: string } | null> {
  try {
    // Ask for location permission first
    if (navigator.geolocation) {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          reject, 
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000 // 5 minutes cache
          }
        );
      });
      
      // Use free reverse geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Location detected:', data.countryName, data.countryCode);
        return {
          country: data.countryName || "Unknown",
          countryCode: data.countryCode || "DEFAULT"
        };
      }
    }
    
    // Fallback to IP-based detection (free tier)
    console.log('Trying IP-based location...');
    const ipResponse = await fetch('https://ipapi.co/json/');
    if (ipResponse.ok) {
      const ipData = await ipResponse.json();
      console.log('IP location detected:', ipData.country_name, ipData.country_code);
      return {
        country: ipData.country_name || "Unknown",
        countryCode: ipData.country_code || "DEFAULT"
      };
    }
    
    return null;
  } catch (error) {
    console.log('Location detection failed:', error);
    return null;
  }
}

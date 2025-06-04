// Comprehensive global emergency numbers database
const emergencyData: Record<string, { emergency: string; crisis: string; name: string }> = {
  // North America
  US: { emergency: "911", crisis: "988", name: "United States" },
  CA: { emergency: "911", crisis: "1-833-456-4566", name: "Canada" },
  MX: { emergency: "911", crisis: "800 911 2000", name: "Mexico" },
  
  // Europe
  GB: { emergency: "999", crisis: "116 123", name: "United Kingdom" },
  DE: { emergency: "112", crisis: "0800 111 0 111", name: "Germany" },
  FR: { emergency: "112", crisis: "3114", name: "France" },
  ES: { emergency: "112", crisis: "717 003 717", name: "Spain" },
  IT: { emergency: "112", crisis: "02 2327 2327", name: "Italy" },
  NL: { emergency: "112", crisis: "0800 0113", name: "Netherlands" },
  SE: { emergency: "112", crisis: "020 22 00 60", name: "Sweden" },
  NO: { emergency: "112", crisis: "815 33 300", name: "Norway" },
  DK: { emergency: "112", crisis: "70 201 201", name: "Denmark" },
  FI: { emergency: "112", crisis: "010 195 202", name: "Finland" },
  IE: { emergency: "999", crisis: "1800 247 247", name: "Ireland" },
  CH: { emergency: "112", crisis: "143", name: "Switzerland" },
  AT: { emergency: "112", crisis: "142", name: "Austria" },
  BE: { emergency: "112", crisis: "1813", name: "Belgium" },
  PT: { emergency: "112", crisis: "213 544 545", name: "Portugal" },
  PL: { emergency: "112", crisis: "116 123", name: "Poland" },
  CZ: { emergency: "112", crisis: "116 111", name: "Czech Republic" },
  SK: { emergency: "112", crisis: "0800 500 333", name: "Slovakia" },
  HU: { emergency: "112", crisis: "116 123", name: "Hungary" },
  RO: { emergency: "112", crisis: "0800 801 200", name: "Romania" },
  BG: { emergency: "112", crisis: "02 819 20 18", name: "Bulgaria" },
  HR: { emergency: "112", crisis: "01 4833 888", name: "Croatia" },
  SI: { emergency: "112", crisis: "080 1200", name: "Slovenia" },
  EE: { emergency: "112", crisis: "655 8088", name: "Estonia" },
  LV: { emergency: "112", crisis: "116 123", name: "Latvia" },
  LT: { emergency: "112", crisis: "116 123", name: "Lithuania" },
  
  // Asia Pacific
  AU: { emergency: "000", crisis: "13 11 14", name: "Australia" },
  NZ: { emergency: "111", crisis: "1737", name: "New Zealand" },
  JP: { emergency: "110", crisis: "03-5774-0992", name: "Japan" },
  KR: { emergency: "119", crisis: "1393", name: "South Korea" },
  CN: { emergency: "110", crisis: "400-161-9995", name: "China" },
  IN: { emergency: "112", crisis: "9152987821", name: "India" },
  TH: { emergency: "191", crisis: "1323", name: "Thailand" },
  SG: { emergency: "995", crisis: "1800-221-4444", name: "Singapore" },
  MY: { emergency: "999", crisis: "03-7956-8144", name: "Malaysia" },
  PH: { emergency: "911", crisis: "02-8969191", name: "Philippines" },
  ID: { emergency: "112", crisis: "119", name: "Indonesia" },
  VN: { emergency: "113", crisis: "1800-1567", name: "Vietnam" },
  
  // Middle East & Africa
  IL: { emergency: "100", crisis: "1201", name: "Israel" },
  AE: { emergency: "999", crisis: "800-4673", name: "United Arab Emirates" },
  SA: { emergency: "997", crisis: "920003343", name: "Saudi Arabia" },
  ZA: { emergency: "10111", crisis: "0800 567 567", name: "South Africa" },
  EG: { emergency: "122", crisis: "762 1602", name: "Egypt" },
  
  // South America
  BR: { emergency: "190", crisis: "188", name: "Brazil" },
  AR: { emergency: "911", crisis: "135", name: "Argentina" },
  CL: { emergency: "133", crisis: "600 360 7777", name: "Chile" },
  CO: { emergency: "123", crisis: "106", name: "Colombia" },
  PE: { emergency: "105", crisis: "201 6500", name: "Peru" },
  
  // Eastern Europe & Russia
  RU: { emergency: "112", crisis: "8-800-2000-122", name: "Russia" },
  UA: { emergency: "112", crisis: "7333", name: "Ukraine" },
  BY: { emergency: "112", crisis: "8801 100 1611", name: "Belarus" },
  
  // Nordic
  IS: { emergency: "112", crisis: "1717", name: "Iceland" },
  
  DEFAULT: { emergency: "112", crisis: "Call Local Crisis Line", name: "International" }
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

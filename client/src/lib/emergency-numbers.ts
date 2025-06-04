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
  
  // Missing European countries
  AD: { emergency: "112", crisis: "116 123", name: "Andorra" },
  AL: { emergency: "112", crisis: "127", name: "Albania" },
  AM: { emergency: "911", crisis: "2-538-194", name: "Armenia" },
  AZ: { emergency: "112", crisis: "1416", name: "Azerbaijan" },
  BA: { emergency: "112", crisis: "1327", name: "Bosnia and Herzegovina" },
  GE: { emergency: "112", crisis: "116 111", name: "Georgia" },
  GR: { emergency: "112", crisis: "1018", name: "Greece" },
  LU: { emergency: "112", crisis: "454545", name: "Luxembourg" },
  MD: { emergency: "112", crisis: "0800 80 123", name: "Moldova" },
  ME: { emergency: "112", crisis: "020 234 567", name: "Montenegro" },
  MK: { emergency: "112", crisis: "177", name: "North Macedonia" },
  MT: { emergency: "112", crisis: "179", name: "Malta" },
  RS: { emergency: "112", crisis: "021 6623 393", name: "Serbia" },
  SM: { emergency: "112", crisis: "0549 996377", name: "San Marino" },
  VA: { emergency: "112", crisis: "06 6988 5442", name: "Vatican City" },
  XK: { emergency: "112", crisis: "0800 11 112", name: "Kosovo" },
  
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
  
  // Additional Asia Pacific
  AF: { emergency: "119", crisis: "0700 102 102", name: "Afghanistan" },
  BD: { emergency: "999", crisis: "09611677777", name: "Bangladesh" },
  BT: { emergency: "112", crisis: "112", name: "Bhutan" },
  BN: { emergency: "991", crisis: "145", name: "Brunei" },
  KH: { emergency: "119", crisis: "1650", name: "Cambodia" },
  FJ: { emergency: "917", crisis: "679 670 565", name: "Fiji" },
  HK: { emergency: "999", crisis: "2896 0000", name: "Hong Kong" },
  KZ: { emergency: "112", crisis: "150", name: "Kazakhstan" },
  KG: { emergency: "112", crisis: "164", name: "Kyrgyzstan" },
  LA: { emergency: "191", crisis: "166", name: "Laos" },
  MO: { emergency: "999", crisis: "2852 2555", name: "Macao" },
  MV: { emergency: "119", crisis: "1424", name: "Maldives" },
  MN: { emergency: "103", crisis: "108", name: "Mongolia" },
  MM: { emergency: "199", crisis: "09 61646700", name: "Myanmar" },
  NP: { emergency: "100", crisis: "1166", name: "Nepal" },
  KP: { emergency: "119", crisis: "119", name: "North Korea" },
  PK: { emergency: "15", crisis: "0800 22444", name: "Pakistan" },
  PG: { emergency: "111", crisis: "675 7344", name: "Papua New Guinea" },
  LK: { emergency: "119", crisis: "1926", name: "Sri Lanka" },
  TW: { emergency: "110", crisis: "1995", name: "Taiwan" },
  TJ: { emergency: "112", crisis: "1201", name: "Tajikistan" },
  TL: { emergency: "112", crisis: "723 1821", name: "Timor-Leste" },
  TM: { emergency: "112", crisis: "109", name: "Turkmenistan" },
  UZ: { emergency: "112", crisis: "1054", name: "Uzbekistan" },
  VU: { emergency: "112", crisis: "22 22 22", name: "Vanuatu" },
  
  // Caribbean & Central America
  AG: { emergency: "911", crisis: "268 462 0803", name: "Antigua and Barbuda" },
  AI: { emergency: "911", crisis: "264 497 2930", name: "Anguilla" },
  AW: { emergency: "911", crisis: "297 582 2648", name: "Aruba" },
  BS: { emergency: "911", crisis: "322 2763", name: "Bahamas" },
  BB: { emergency: "911", crisis: "429 9999", name: "Barbados" },
  BZ: { emergency: "911", crisis: "223 0353", name: "Belize" },
  BM: { emergency: "911", crisis: "236 3770", name: "Bermuda" },
  VG: { emergency: "911", crisis: "494 2570", name: "British Virgin Islands" },
  KY: { emergency: "911", crisis: "945 9339", name: "Cayman Islands" },
  CR: { emergency: "911", crisis: "2272 3774", name: "Costa Rica" },
  CU: { emergency: "106", crisis: "7 838 5289", name: "Cuba" },
  CW: { emergency: "911", crisis: "9 462 0303", name: "Curaçao" },
  DM: { emergency: "999", crisis: "767 448 7650", name: "Dominica" },
  DO: { emergency: "911", crisis: "809 200 1202", name: "Dominican Republic" },
  SV: { emergency: "911", crisis: "2523 4570", name: "El Salvador" },
  GD: { emergency: "911", crisis: "473 440 1085", name: "Grenada" },
  GP: { emergency: "112", crisis: "590 590 830 130", name: "Guadeloupe" },
  GT: { emergency: "110", crisis: "1545", name: "Guatemala" },
  HT: { emergency: "114", crisis: "2816 3344", name: "Haiti" },
  HN: { emergency: "911", crisis: "2239 1649", name: "Honduras" },
  JM: { emergency: "119", crisis: "876 906 2873", name: "Jamaica" },
  MQ: { emergency: "112", crisis: "596 596 75 75 75", name: "Martinique" },
  MS: { emergency: "911", crisis: "664 491 7200", name: "Montserrat" },
  NI: { emergency: "911", crisis: "2249 8181", name: "Nicaragua" },
  PA: { emergency: "911", crisis: "507 262 1717", name: "Panama" },
  PR: { emergency: "911", crisis: "787 274 3563", name: "Puerto Rico" },
  KN: { emergency: "911", crisis: "869 465 2521", name: "Saint Kitts and Nevis" },
  LC: { emergency: "999", crisis: "758 451 4357", name: "Saint Lucia" },
  VC: { emergency: "999", crisis: "784 456 1044", name: "Saint Vincent and the Grenadines" },
  SX: { emergency: "911", crisis: "721 542 2000", name: "Sint Maarten" },
  TT: { emergency: "990", crisis: "645 2800", name: "Trinidad and Tobago" },
  TC: { emergency: "911", crisis: "649 946 4357", name: "Turks and Caicos Islands" },
  VI: { emergency: "911", crisis: "340 776 5300", name: "US Virgin Islands" },
  
  // Middle East & Africa - Expanded
  IL: { emergency: "100", crisis: "1201", name: "Israel" },
  AE: { emergency: "999", crisis: "800-4673", name: "United Arab Emirates" },
  SA: { emergency: "997", crisis: "920003343", name: "Saudi Arabia" },
  ZA: { emergency: "10111", crisis: "0800 567 567", name: "South Africa" },
  EG: { emergency: "122", crisis: "762 1602", name: "Egypt" },
  
  // Additional Middle East
  BH: { emergency: "999", crisis: "17 682000", name: "Bahrain" },
  IR: { emergency: "110", crisis: "1480", name: "Iran" },
  IQ: { emergency: "104", crisis: "1823", name: "Iraq" },
  JO: { emergency: "911", crisis: "110", name: "Jordan" },
  KW: { emergency: "112", crisis: "25371700", name: "Kuwait" },
  LB: { emergency: "112", crisis: "1564", name: "Lebanon" },
  OM: { emergency: "9999", crisis: "2441 1373", name: "Oman" },
  PS: { emergency: "100", crisis: "121", name: "Palestine" },
  QA: { emergency: "999", crisis: "44 66 9999", name: "Qatar" },
  SY: { emergency: "112", crisis: "143", name: "Syria" },
  TR: { emergency: "112", crisis: "182", name: "Turkey" },
  YE: { emergency: "191", crisis: "177", name: "Yemen" },
  
  // Additional Africa
  DZ: { emergency: "14", crisis: "3021 65 00 65", name: "Algeria" },
  AO: { emergency: "113", crisis: "923 000 000", name: "Angola" },
  BJ: { emergency: "117", crisis: "21 30 03 22", name: "Benin" },
  BW: { emergency: "997", crisis: "3911270", name: "Botswana" },
  BF: { emergency: "112", crisis: "25 36 46 55", name: "Burkina Faso" },
  BI: { emergency: "112", crisis: "79 05 05 05", name: "Burundi" },
  CV: { emergency: "132", crisis: "238 261 2626", name: "Cape Verde" },
  CM: { emergency: "112", crisis: "8252", name: "Cameroon" },
  CF: { emergency: "117", crisis: "236 61 50 60", name: "Central African Republic" },
  TD: { emergency: "117", crisis: "235 51 51 51", name: "Chad" },
  KM: { emergency: "17", crisis: "269 73 11 12", name: "Comoros" },
  CG: { emergency: "112", crisis: "242 534 60 60", name: "Congo" },
  CD: { emergency: "112", crisis: "243 815 555 555", name: "Democratic Republic of the Congo" },
  CI: { emergency: "111", crisis: "1444", name: "Côte d'Ivoire" },
  DJ: { emergency: "17", crisis: "253 35 25 25", name: "Djibouti" },
  GQ: { emergency: "112", crisis: "240 098 888", name: "Equatorial Guinea" },
  ER: { emergency: "127", crisis: "291 1 120120", name: "Eritrea" },
  SZ: { emergency: "999", crisis: "268 2416 8787", name: "Eswatini" },
  ET: { emergency: "991", crisis: "1220", name: "Ethiopia" },
  GA: { emergency: "1730", crisis: "241 76 27 27", name: "Gabon" },
  GM: { emergency: "116", crisis: "220 4494 069", name: "Gambia" },
  GH: { emergency: "191", crisis: "233 244 846 701", name: "Ghana" },
  GN: { emergency: "117", crisis: "224 657 227 227", name: "Guinea" },
  GW: { emergency: "113", crisis: "245 201 1040", name: "Guinea-Bissau" },
  KE: { emergency: "999", crisis: "0800 720 046", name: "Kenya" },
  LS: { emergency: "112", crisis: "266 2231 3311", name: "Lesotho" },
  LR: { emergency: "911", crisis: "231 770 002 003", name: "Liberia" },
  LY: { emergency: "193", crisis: "218 21 444 7773", name: "Libya" },
  MG: { emergency: "117", crisis: "261 20 22 265 60", name: "Madagascar" },
  MW: { emergency: "997", crisis: "265 1 789 689", name: "Malawi" },
  ML: { emergency: "15", crisis: "223 44 92 92", name: "Mali" },
  MR: { emergency: "17", crisis: "222 525 2525", name: "Mauritania" },
  MU: { emergency: "999", crisis: "230 800 9396", name: "Mauritius" },
  MA: { emergency: "19", crisis: "0801 000 180", name: "Morocco" },
  MZ: { emergency: "119", crisis: "258 21 431 146", name: "Mozambique" },
  NA: { emergency: "10111", crisis: "264 61 232 221", name: "Namibia" },
  NE: { emergency: "17", crisis: "227 96 26 26 26", name: "Niger" },
  NG: { emergency: "199", crisis: "234 806 210 6493", name: "Nigeria" },
  RW: { emergency: "112", crisis: "3912", name: "Rwanda" },
  ST: { emergency: "112", crisis: "239 222 2222", name: "São Tomé and Príncipe" },
  SN: { emergency: "17", crisis: "221 33 889 58 58", name: "Senegal" },
  SC: { emergency: "999", crisis: "248 4 225 225", name: "Seychelles" },
  SL: { emergency: "019", crisis: "232 76 555 308", name: "Sierra Leone" },
  SO: { emergency: "888", crisis: "252 1 555 827", name: "Somalia" },
  SS: { emergency: "777", crisis: "211 922 478 881", name: "South Sudan" },
  SD: { emergency: "999", crisis: "249 156 404 404", name: "Sudan" },
  TZ: { emergency: "112", crisis: "255 744 444 001", name: "Tanzania" },
  TG: { emergency: "117", crisis: "228 22 25 18 18", name: "Togo" },
  TN: { emergency: "197", crisis: "216 71 560 312", name: "Tunisia" },
  UG: { emergency: "999", crisis: "256 800 200 210", name: "Uganda" },
  ZM: { emergency: "999", crisis: "260 211 256 005", name: "Zambia" },
  ZW: { emergency: "994", crisis: "263 4 700 313", name: "Zimbabwe" },
  
  // South America - Expanded
  BR: { emergency: "190", crisis: "188", name: "Brazil" },
  AR: { emergency: "911", crisis: "135", name: "Argentina" },
  CL: { emergency: "133", crisis: "600 360 7777", name: "Chile" },
  CO: { emergency: "123", crisis: "106", name: "Colombia" },
  PE: { emergency: "105", crisis: "201 6500", name: "Peru" },
  BO: { emergency: "110", crisis: "800 10 1016", name: "Bolivia" },
  EC: { emergency: "911", crisis: "1800 362 362", name: "Ecuador" },
  FK: { emergency: "999", crisis: "500 28000", name: "Falkland Islands" },
  GF: { emergency: "112", crisis: "594 594 30 03 30", name: "French Guiana" },
  GY: { emergency: "911", crisis: "592 223 0001", name: "Guyana" },
  PY: { emergency: "911", crisis: "147", name: "Paraguay" },
  SR: { emergency: "115", crisis: "597 717 373", name: "Suriname" },
  UY: { emergency: "911", crisis: "0800 8483", name: "Uruguay" },
  VE: { emergency: "171", crisis: "0212 433 4433", name: "Venezuela" },
  
  // Eastern Europe & Russia - Expanded
  RU: { emergency: "112", crisis: "8-800-2000-122", name: "Russia" },
  UA: { emergency: "112", crisis: "7333", name: "Ukraine" },
  BY: { emergency: "112", crisis: "8801 100 1611", name: "Belarus" },
  
  // Oceania - Expanded
  CK: { emergency: "999", crisis: "682 29 364", name: "Cook Islands" },
  PF: { emergency: "112", crisis: "689 87 20 20 20", name: "French Polynesia" },
  GU: { emergency: "911", crisis: "671 647 8833", name: "Guam" },
  KI: { emergency: "999", crisis: "686 28 082", name: "Kiribati" },
  MH: { emergency: "911", crisis: "692 625 4296", name: "Marshall Islands" },
  FM: { emergency: "911", crisis: "691 320 8000", name: "Micronesia" },
  NR: { emergency: "110", crisis: "674 444 3027", name: "Nauru" },
  NC: { emergency: "112", crisis: "687 278 278", name: "New Caledonia" },
  NU: { emergency: "999", crisis: "683 4002", name: "Niue" },
  NF: { emergency: "911", crisis: "672 3 22177", name: "Norfolk Island" },
  MP: { emergency: "911", crisis: "670 235 7273", name: "Northern Mariana Islands" },
  PW: { emergency: "911", crisis: "680 488 2633", name: "Palau" },
  PN: { emergency: "999", crisis: "872 3 315 049", name: "Pitcairn Islands" },
  WS: { emergency: "994", crisis: "685 800 1363", name: "Samoa" },
  SB: { emergency: "999", crisis: "677 25 177", name: "Solomon Islands" },
  TK: { emergency: "999", crisis: "690 7290", name: "Tokelau" },
  TO: { emergency: "911", crisis: "676 32 444", name: "Tonga" },
  TV: { emergency: "911", crisis: "688 20 019", name: "Tuvalu" },
  WF: { emergency: "112", crisis: "681 72 20 20", name: "Wallis and Futuna" },
  
  // Nordic - Complete
  IS: { emergency: "112", crisis: "1717", name: "Iceland" },
  FO: { emergency: "112", crisis: "298 358 888", name: "Faroe Islands" },
  GL: { emergency: "112", crisis: "299 36 11 12", name: "Greenland" },
  SJ: { emergency: "112", crisis: "79 02 58 00", name: "Svalbard and Jan Mayen" },
  
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

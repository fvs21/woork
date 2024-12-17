
function normalizeCountry(country) {
  //function to remove accents and other punctuation from a country
  return country
  ?.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
}

export function loadCities(country, state) {
  const normalizedCountry = normalizeCountry(country);
  const cities = require(`@/services/countries/${normalizedCountry}/${state}.json`);
  return cities;
}

export function loadStates(country) {
  const normalizedCountry = normalizeCountry(country); 
  const states = require(`@/services/countries/${normalizedCountry}/states.json`);
  return states;
}

function normalizeCountry(country) {
  //function to remove accents and other punctuation from a country
  return country
  ?.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
}

export async function loadCities(country, state) {
  const normalizedCountry = normalizeCountry(country);
  return await import(`../../Services/countries/${normalizedCountry}/${state}`);
}

export async function loadStates(country) {
  const normalizedCountry = normalizeCountry(country); 
  return await import(`../../Services/countries/${normalizedCountry}/states`, { with: { type: "json" }});
}
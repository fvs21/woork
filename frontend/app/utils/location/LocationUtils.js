export function loadCities(country, state) {
    const normalizedCountry = country
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const cities = require(
      `../../services/countries/${normalizedCountry}/${state}.json`,
    );
    return cities;
}

export function loadStates(country) {
    const normalizedCountry = country
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const states = require(`../../services/countries/${normalizedCountry}/states.json`);
    return states;
}
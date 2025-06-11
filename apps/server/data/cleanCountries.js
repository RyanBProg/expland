const countryData = require("../data/countries.json");
const fs = require("fs");

const cleanedCountries = countryData.map(country => {
  return {
    name: { common: country.name.common, official: country.name.official },
    cca2: country.cca2,
    cca3: country.cca3,
    ccn3: country.ccn3,
    independent: country.independent,
    status: country.status,
    unMember: country.unMember,
    currencies: country.currencies,
    idd: country.idd,
    capital: country.capital,
    region: country.region,
    subregion: country.subregion,
    languages: country.languages,
    latlng: country.latlng,
    landlocked: country.landlocked,
    borders: country.borders,
    area: country.area,
    flag: country.flag,
    maps: country.maps,
    population: country.population,
    timezones: country.timezones,
    continents: country.continents,
  };
});

fs.writeFile("cleanedCountries.json", JSON.stringify(cleanedCountries), function (err) {
  if (err) throw err;
  console.log("complete");
});

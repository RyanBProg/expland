import countriesData from "../../data/countrySeedingData.json";
import { Prisma } from "../prisma-client/client";
import prisma from "../prismaClient";

type CountryCreateInput = Prisma.CountryCreateInput;

export async function seedCountries() {
  const formattedCountries: CountryCreateInput[] = countriesData.map(country => {
    let currencyName: string | null = null;
    const currencies = country.currencies || {};
    const firstCurrency = Object.values(currencies)[0] as
      | {
          name: string;
          symbol: string;
        }
      | undefined;
    if (firstCurrency) {
      currencyName = firstCurrency.name;
    }

    return {
      name: country.name.common,
      official_name: country.name.official,
      iso_2: country.cca2,
      iso_num: country.ccn3,
      region: country.region,
      subregion: country.subregion,
      continents: country.continents,
      languages: Object.values(country.languages || {}) as string[],
      capital: country.capital?.[0] || null,
      population: country.population || null,
      landArea: country.area || null,
      landlocked: country.landlocked,
      independent: country.independent,
      currency: currencyName,
      timezones: country.timezones,
      latitude: country.latlng?.[0] || null,
      longitude: country.latlng?.[1] || null,
      google_maps_url: country.maps.openStreetMaps,
    };
  });

  // console.log(formattedCountries);

  await prisma.country.createMany({ data: formattedCountries });
}

seedCountries();

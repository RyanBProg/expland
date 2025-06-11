import citiesData from "../../data/citySeedingData.json";
import { Prisma } from "../prisma-client/client";
import prisma from "../prismaClient";

type CityData = {
  name: string;
  country_iso_2: string;
  country_name: string;
  population: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

const citiesDataTyped = citiesData as CityData[];

type CityCreateManyInput = Prisma.CityCreateManyInput;

export async function seedCities() {
  // get all countries to map ISO codes to IDs
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      iso_2: true,
      name: true,
    },
  });

  // map for easy country lookup
  const countryMap = new Map(countries.map(c => [c.iso_2, { id: c.id, name: c.name }]));

  const formattedCities: CityCreateManyInput[] = citiesDataTyped
    .map(city => {
      const country = countryMap.get(city.country_iso_2);

      if (!country) {
        console.warn(`No country found for ISO code: ${city.country_iso_2}`);
        return null;
      }

      return {
        name: city.name,
        country_iso_2: city.country_iso_2,
        country_name: country.name,
        population: city.population ? parseInt(city.population) : null,
        timezone: city.timezone,
        latitude: city.latitude ? parseFloat(city.latitude) : null,
        longitude: city.longitude ? parseFloat(city.longitude) : null,
        countryId: country.id,
      };
    })
    .filter(city => city !== null);

  // Create cities in batches to handle large datasets
  const BATCH_SIZE = 100;
  for (let i = 0; i < formattedCities.length; i += BATCH_SIZE) {
    const batch = formattedCities.slice(i, i + BATCH_SIZE);
    await prisma.city.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`Created cities ${i + 1} to ${i + batch.length}`);
  }

  console.log(`Seeded ${formattedCities.length} cities`);
}

// Run the seeding
seedCities()
  .catch(e => {
    console.error("Error seeding cities:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

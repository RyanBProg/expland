const fs = require("fs");
const csv = require("csv-parse/sync");

function formatTimezone(timezone) {
  if (!timezone) {
    return "UTC+00:00";
  }

  try {
    // Get current date to account for DST
    const date = new Date();

    // Use Intl.DateTimeFormat to get the timezone offset
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    });

    // Extract UTC offset from the formatted string
    const parts = format.formatToParts(date);
    const offsetPart = parts.find(part => part.type === "timeZoneName");

    if (!offsetPart) {
      return "UTC+00:00";
    }

    // Convert "GMT+08:00" to "UTC+08:00"
    return offsetPart.value.replace("GMT", "UTC");
  } catch (error) {
    // If timezone is invalid, return UTC
    console.warn(`Invalid timezone: ${timezone}, using UTC+00:00`);
    return "UTC+00:00";
  }
}

// parse cities15000.txt
const citiesTxtRaw = fs.readFileSync("../data/cities15000.txt", "utf8");
const citiesTxtFormatted = citiesTxtRaw.split("\n").map(line => {
  const [
    id,
    name,
    asciiName,
    alternateNames,
    latitude,
    longitude,
    featureClass,
    featureCode,
    countryCode,
    cc2,
    admin1Code,
    admin2Code,
    admin3Code,
    admin4Code,
    population,
    elevation,
    dem,
    timezone,
    modificationDate,
  ] = line.split("\t");

  // convert timezone to utc string e.g. "UTC+01:00"

  return {
    city_ascii: asciiName,
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
    iso2: countryCode,
    timezone: formatTimezone(timezone),
  };
});

// map for easy lookup
const citiesTxtMap = new Map();
citiesTxtFormatted.forEach(city => {
  const key = `${city.city_ascii}-${city.iso2}`;
  citiesTxtMap.set(key, city);
});

// parse worldcities.csv
const citiesCsvRaw = fs.readFileSync("./worldcities.csv", "utf8");
const citiesCsv = csv.parse(citiesCsvRaw, {
  columns: true,
  skip_empty_lines: true,
});

// match cities
const matchingCities = citiesCsv
  .filter(city => {
    const key = `${city.city_ascii}-${city.iso2}`;
    return citiesTxtMap.has(key);
  })
  .map(city => {
    const key = `${city.city_ascii}-${city.iso2}`;
    const cityTxt = citiesTxtMap.get(key);

    return {
      name: city.city_ascii,
      country_iso_2: city.iso2,
      country_name: city.country,
      population: city.population,
      latitude: city.lat,
      longitude: city.lng,
      timezone: cityTxt.timezone,
    };
  });

fs.writeFileSync("citySeedingData.json", JSON.stringify(matchingCities, null, 2));

console.log(`Found ${matchingCities.length} cities that exist in both datasets`);

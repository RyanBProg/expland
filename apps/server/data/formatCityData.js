const fs = require("fs");

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

function parseCityTxt() {
  const admin1CodesRaw = fs.readFileSync("./admin1Codes.txt", "utf8");
  const admin1Map = {};
  admin1CodesRaw.split("\n").forEach(line => {
    const [admin1Code, state, stateAlt, code] = line.split("\t");
    admin1Map[admin1Code] = { state };
  });

  const admin2CodesRaw = fs.readFileSync("./admin2Codes.txt", "utf8");
  const admin2Map = {};
  admin2CodesRaw.split("\n").forEach(line => {
    const [admin2Code, county, countyAlt, code] = line.split("\t");
    admin2Map[admin2Code] = { county };
  });

  const citiesTxtRaw = fs.readFileSync("./cities500.txt", "utf8");
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
      countryIso2,
      cc2,
      admin1Code,
      admin2Code,
      admin3Code,
      admin4Code,
      population,
      elevation,
      digitalElevation,
      timezone,
      modificationDate,
    ] = line.split("\t");

    let state = "";
    if (admin1Code) {
      const code = `${countryIso2}.${admin1Code}`;
      if (admin1Map[code]) {
        state = admin1Map[code].state;
      }
    }

    let county = "";
    if (admin1Code && admin2Code) {
      const code = `${countryIso2}.${admin1Code}.${admin2Code}`;
      if (admin2Map[code]) {
        county = admin2Map[code].county;
      }
    }

    return {
      name: asciiName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      countryIso2,
      admin1Code,
      state,
      admin2Code,
      county,
      population,
      elevation,
      digitalElevation,
      timezone: formatTimezone(timezone),
    };
  });

  fs.writeFileSync("citySeedingData.json", JSON.stringify(citiesTxtFormatted, null, 2));
}

parseCityTxt();

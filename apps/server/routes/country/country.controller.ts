import { Response } from "express";
import { TUserTokenRequest } from "../../utils/types/types";
import prisma from "../../database/prismaClient";
import { handleControllerError } from "../../utils/handleControllerError";

async function listCountries(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { continent, language, independent } = req.query;
    const isValidIndependent = ["true", "false"].includes(independent as string);

    const where = {
      ...(continent && { continents: { hasSome: [continent as string] } }),
      ...(language && { languages: { hasSome: [language as string] } }),
      ...(isValidIndependent && { independent: independent === "true" }),
    };

    const countries = await prisma.country.findMany({
      where: Object.keys(where).length ? where : undefined,
    });

    res.status(200).json({ data: countries });
  } catch (error) {
    handleControllerError(error, res, "listCountries");
  }
}

async function getCountry(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { countryId, countryName, countryIso } = req.query;

    if (countryId) {
      const id = parseInt(countryId as string);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid country ID format" });
      }
      const country = await prisma.country.findFirst({ where: { id } });
      res.status(200).json({ data: country });
    } else if (countryIso) {
      const country = await prisma.country.findFirst({
        where: { iso_2: { equals: countryIso as string, mode: "insensitive" } },
      });
      res.status(200).json({ data: country });
    } else if (countryName) {
      const country = await prisma.country.findFirst({
        where: { name: { equals: countryName as string, mode: "insensitive" } },
      });
      res.status(200).json({ data: country });
    } else {
      res
        .status(400)
        .json({ message: "Query parameter required: countryId, countryName, or countryIso" });
    }
  } catch (error) {
    handleControllerError(error, res, "getCountry");
  }
}

async function listCities(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { countryId, countryIso } = req.query;

    if (countryId) {
      const id = parseInt(countryId as string);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid country ID format" });
      }
      const cities = await prisma.city.findMany({
        where: { countryId: id },
      });
      res.status(200).json({ data: cities });
    } else if (countryIso) {
      const cities = await prisma.city.findMany({
        where: { country_iso_2: { equals: countryIso as string, mode: "insensitive" } },
      });
      res.status(200).json({ data: cities });
    } else {
      const cities = await prisma.city.findMany();
      res.status(200).json({ data: cities });
    }
  } catch (error) {
    handleControllerError(error, res, "listCities");
  }
}

async function getCity(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { cityId, cityName } = req.query;

    if (cityId) {
      const id = parseInt(cityId as string);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid country ID format" });
      }
      const city = await prisma.city.findFirst({ where: { id } });
      res.status(200).json({ data: city });
    } else if (cityName) {
      const city = await prisma.city.findFirst({
        where: { name: { equals: cityName as string, mode: "insensitive" } },
      });
      res.status(200).json({ data: city });
    } else {
      res.status(400).json({ message: "Query parameter required: cityId or cityName" });
    }
  } catch (error) {
    handleControllerError(error, res, "getCity");
  }
}

export default {
  listCountries,
  getCountry,
  listCities,
  getCity,
};

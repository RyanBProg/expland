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

    // query parameters for pagination
    // const page = parseInt(req.query.page as string) || 1;
    // if (page < 1) {
    //   res.status(400).json({ message: "Page must be greater than 0" });
    //   return;
    // }

    const { continent, language, independent } = req.query;
    const isValidIndependent = ["true", "false"].includes(independent as string);

    const where = {
      ...(continent && { continents: { hasSome: [continent as string] } }),
      ...(language && { languages: { hasSome: [language as string] } }),
      ...(isValidIndependent && { independent: independent === "true" }),
    };

    // total count for pagination
    // const totalTravels = await prisma.country.count({
    //   where: Object.keys(where).length ? where : undefined,
    // });

    // const limit = 10;
    // const totalPages = Math.ceil(totalTravels / limit);

    const countries = await prisma.country.findMany({
      where: Object.keys(where).length ? where : undefined,
      // skip: (page - 1) * limit,
      // take: limit,
    });

    res.status(200).json({
      data: countries,
      // pagination: {
      //   currentPage: page,
      //   totalPages,
      //   totalItems: totalTravels,
      //   hasNextPage: page < totalPages,
      //   hasPreviousPage: page > 1,
      // },
    });
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

    // query parameters for pagination
    const page = parseInt(req.query.page as string) || 1;
    if (page < 1) {
      res.status(400).json({ message: "Page must be greater than 0" });
      return;
    }

    const { countryId, countryIso } = req.query;

    let where = {};

    if (countryId) {
      const id = parseInt(countryId as string);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid country ID format" });
      }
      where = { countryId: id };
    } else if (countryIso) {
      where = { country_iso_2: { equals: countryIso as string, mode: "insensitive" } };
    }

    // total count for pagination
    const totalTravels = await prisma.city.count({ where });

    const limit = 10;
    const totalPages = Math.ceil(totalTravels / limit);

    const cities = await prisma.city.findMany({ where, skip: (page - 1) * limit, take: limit });

    res.status(200).json({
      data: cities,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalTravels,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
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

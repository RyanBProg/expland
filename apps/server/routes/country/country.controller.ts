import { Response } from "express";
import { TUserTokenRequest } from "../../utils/types/types";
import prisma from "../../database/prismaClient";
import { handleControllerError } from "../../utils/handleControllerError";
import { validatePageLimit } from "../../utils/validatePageLimit";

async function listCountries(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const {
      continent,
      language,
      independent,
      detail = "summary",
      limit = "10",
      page = "1",
    } = req.query;

    // build a select
    let select;
    if (detail === "summary") {
      select = {
        id: true,
        name: true,
        iso_2: true,
      };
    } else if (detail === "full") {
      select = undefined;
    } else {
      res.status(400).json({ message: "Invalid detail param value" });
      return;
    }

    // build a where clause
    const isValidIndependent = ["true", "false"].includes(independent as string);
    const where = {
      ...(continent && { continents: { hasSome: [continent as string] } }),
      ...(language && { languages: { hasSome: [language as string] } }),
      ...(isValidIndependent && { independent: independent === "true" }),
    };

    if (limit === "all") {
      const countries = await prisma.country.findMany({
        where: Object.keys(where).length ? where : undefined,
        select,
      });
      res.status(200).json({ data: countries });
    } else {
      const { error, pageNum, resultLimit } = validatePageLimit(page as string, limit as string);
      if (error) {
        res.status(400).json({ message: error });
        return;
      }
      if (!pageNum && !resultLimit) {
        res.status(400).json({ message: "Invalid page or limit values" });
        return;
      }

      const totalCountries = await prisma.country.count({
        where: Object.keys(where).length ? where : undefined,
      });
      const totalPages = Math.ceil(totalCountries / resultLimit);

      const countries = await prisma.country.findMany({
        where: Object.keys(where).length ? where : undefined,
        select,
        skip: (pageNum - 1) * resultLimit,
        take: resultLimit,
      });
      res.status(200).json({
        data: countries,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCountries,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1,
        },
      });
    }
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

    const { countryId, countryIso, detail = "summary", limit = "10", page = "1" } = req.query;

    // build a select
    let select;
    if (detail === "summary") {
      select = {
        id: true,
        name: true,
        countryId: true,
      };
    } else if (detail === "full") {
      select = undefined;
    } else {
      res.status(400).json({ message: "Invalid detail param value" });
      return;
    }

    // build a where clause
    let where = {};
    if (countryId) {
      const id = parseInt(countryId as string);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid country ID format" });
        return;
      }
      where = { countryId: id };
    } else if (countryIso) {
      where = { country_iso_2: { equals: countryIso as string, mode: "insensitive" } };
    }

    // build pagination values
    if (limit === "all") {
      const cities = await prisma.city.findMany({ where, select });
      res.status(200).json({ data: cities });
    } else {
      const { error, pageNum, resultLimit } = validatePageLimit(page as string, limit as string);
      if (error) {
        res.status(400).json({ message: error });
        return;
      }
      if (!pageNum && !resultLimit) {
        res.status(400).json({ message: "Invalid page or limit values" });
        return;
      }

      const totalCities = await prisma.city.count({ where });
      const totalPages = Math.ceil(totalCities / resultLimit);

      const cities = await prisma.city.findMany({
        where,
        select,
        skip: (pageNum - 1) * resultLimit,
        take: resultLimit,
      });

      res.status(200).json({
        data: cities,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: totalCities,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1,
        },
      });
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

import { Request, Response } from "express";
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

    const countries = await prisma.country.findMany();

    res.status(200).json({ data: countries });
  } catch (error) {
    handleControllerError(error, res, "listCountries");
  }
}

async function getCountryById(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const countryId = req.params.countryId;
    if (!countryId) {
      res.status(400).json({ message: "Country ID is required" });
      return;
    }

    const country = await prisma.country.findFirst({ where: { id: parseInt(countryId) } });

    res.status(200).json({ data: country });
  } catch (error) {
    handleControllerError(error, res, "getCountryById");
  }
}

async function searchCountries(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "searchCountries");
  }
}

async function getCityById(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const cityId = req.params.cityId;
    if (!cityId) {
      res.status(400).json({ message: "City ID is required" });
      return;
    }

    const city = await prisma.city.findFirst({ where: { id: parseInt(cityId) } });

    res.status(200).json({ data: city });
  } catch (error) {
    handleControllerError(error, res, "getCityById");
  }
}

export default {
  listCountries,
  getCountryById,
  searchCountries,
  getCityById,
};

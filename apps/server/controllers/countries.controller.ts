import { Request, Response } from "express";

async function listCountries(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function getCountryById(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function searchCountries(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

export default {
  listCountries,
  getCountryById,
  searchCountries,
};

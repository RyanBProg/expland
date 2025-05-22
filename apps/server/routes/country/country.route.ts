import express from "express";
import countryControllers from "./country.controller";

const router = express.Router();

// List all countries (optionally paginated or filtered)
router.get("/", countryControllers.listCountries);

// Get info for a specific country by id
router.get("/:countryId", countryControllers.getCountryById);

// Search countries by name, continent, etc.
router.get("/search", countryControllers.searchCountries);

// Get info for a specific city by id
router.get("/city/:cityId", countryControllers.getCityById);

export default router;

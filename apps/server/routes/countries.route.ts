import express from "express";
import countriesControllers from "../controllers/countries.controller";

const router = express.Router();

// List all countries (optionally paginated or filtered)
router.get("/", countriesControllers.listCountries);

// Get info for a specific country by code or id
router.get("/:countryId", countriesControllers.getCountryById);

// Search countries by name, continent, etc.
router.get("/search", countriesControllers.searchCountries);

export default router;

import express from "express";
import countryControllers from "./country.controller";
import { authenticateTokens } from "../../middleware/auth.middleware";

const router = express.Router();

// List countries (paginated and filtered)
router.get("/", authenticateTokens, countryControllers.listCountries);

// Get a specific country
router.get("/find", authenticateTokens, countryControllers.getCountry);

// List cities (paginated and filtered)
router.get("/cities", authenticateTokens, countryControllers.listCities);

// Get a specific city
router.get("/cities/find", authenticateTokens, countryControllers.getCity);

export default router;

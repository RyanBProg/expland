import express from "express";
import countryControllers from "./country.controller";

const router = express.Router();

// List countries (paginated and filtered)
router.get("/", countryControllers.listCountries);

// Get a specific country
router.get("/find", countryControllers.getCountry);

// List cities (paginated and filtered)
router.get("/cities", countryControllers.listCities);

// Get a specific city
router.get("/cities/find", countryControllers.getCity);

export default router;

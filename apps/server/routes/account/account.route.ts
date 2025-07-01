import express from "express";
import accountControllers from "./account.controller";
import { authenticateTokens } from "../../middleware/auth.middleware";

const router = express.Router();

// - Account Management -

// Get user account details
router.get("/", authenticateTokens, accountControllers.getAccount);

// Update user password
router.put("/password", authenticateTokens, accountControllers.updatePassword);

// Update username
router.put("/username", authenticateTokens, accountControllers.updateUsername);

// Update given name
router.put("/given-name", authenticateTokens, accountControllers.updateGivenName);

// Update family name
router.put("/family-name", authenticateTokens, accountControllers.updateFamilyName);

// - Profile Management -

// Get user profile
router.get("/profile", authenticateTokens, accountControllers.getProfile);

// Create a user profile
router.post("/profile", authenticateTokens, accountControllers.createProfile);

// Update profile (bio, location etc.)
router.put("/profile", authenticateTokens, accountControllers.updateProfile);

// Update profile picture
router.put("/profile/profile-picture", authenticateTokens, accountControllers.updateProfilePicture);

// - Travel Management -

// List/search all users travels (paginated)
router.get("/profile/travels", authenticateTokens, accountControllers.getAllTravels);

// Lists all users travels (un-paginated)
router.get("/profile/travels-preview", authenticateTokens, accountControllers.getAllTravelsPreview);

// Get a specific travel
router.get("/profile/travels/:travelId", authenticateTokens, accountControllers.getTravel);

// Add a new travel
router.post("/profile/travels", authenticateTokens, accountControllers.addTravel);

// Edit a travel
router.put("/profile/travels/:travelId", authenticateTokens, accountControllers.editTravel);

// Delete a travel
router.delete("/profile/travels/:travelId", authenticateTokens, accountControllers.deleteTravel);

export default router;

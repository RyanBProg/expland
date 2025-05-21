import express from "express";
import accountControllers from "./account.controller";
import { authenticateTokens } from "../../middleware/auth.middleware";

const router = express.Router();

// - Account Management -

// Get user account details
router.get("/", authenticateTokens, accountControllers.getAccount);

// Update user email
router.put("/email", accountControllers.updateEmail);

// Update user password
router.put("/password", accountControllers.updatePassword);

// Delete user account
router.delete("/", accountControllers.deleteAccount);

// - Profile Management -

// Get user profile
router.get("/profile", authenticateTokens, accountControllers.getProfile);

// Create a user profile
router.post("/profile", authenticateTokens, accountControllers.createProfile);

// Update profile (bio, location etc.)
router.put("/profile", accountControllers.updateProfile);

// Update profile picture
router.put("profile/profile-picture", accountControllers.updateProfilePicture);

// - Travel Management -

// List/search all users travels (paginated)
router.get("profile/travels", accountControllers.getAllTravels);

// Get a specific travel
router.get("profile/travels/:travelId", accountControllers.getTravel);

// Add a new travel
router.post("profile/travels", accountControllers.addTravel);

// Edit a travel
router.put("profile/travels/:travelId", accountControllers.editTravel);

// Delete a travel
router.delete("profile/travels/:travelId", accountControllers.deleteTravel);

export default router;

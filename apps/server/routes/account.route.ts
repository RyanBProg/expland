import express from "express";
import accountControllers from "../controllers/account.controller";

const router = express.Router();

// - Account Management -

// Get user account details
router.get("/", accountControllers.getAccount);

// Update user email
router.put("/email", accountControllers.updateEmail);

// Update user password
router.put("/password", accountControllers.updatePassword);

// Delete user account
router.delete("/", accountControllers.deleteAccount);

// - Profile Management -

// Get user profile
router.get("/profile", accountControllers.getProfile);

// Update profile (bio, location etc.)
router.put("/profile", accountControllers.updateProfile);

// Update profile picture
router.put("profile/profile-picture", accountControllers.updateProfilePicture);

// - Travel Management -

// List/search all users travels (paginated)
router.get("profile/travels", accountControllers.updateProfilePicture);

// Get a specific travel
router.get("profile/travels/:travelId", accountControllers.updateProfilePicture);

// Add a new travel
router.post("profile/travels", accountControllers.updateProfilePicture);

// Edit a travel
router.put("profile/travels/:travelId", accountControllers.updateProfilePicture);

// Delete a travel
router.delete("profile/travels/:travelId", accountControllers.updateProfilePicture);

export default router;

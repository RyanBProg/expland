import express from "express";
import userControllers from "../controllers/users.controller";

const router = express.Router();

// - View Users -

// List/search all user profiles (paginated)
router.get("/", userControllers.listProfiles);

// Get a specified users profile
router.get("/:userId", userControllers.getProfileByUserId);

// - Social Actions -

// Follow a users profile
router.post("/:userId/follow", userControllers.followUser);

// Unfollow a users profile
router.post("/:userId/unfollow", userControllers.unfollowUser);

// - Travels -

// View a users travels
router.get("/:userId/travels", userControllers.getUserTravels);

// Get a users specific travel
router.get("/:userId/travels/:travelId", userControllers.getUserTravelbyId);

export default router;

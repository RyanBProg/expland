import express from "express";
import authControllers from "./auth.controller";
import { authenticateTokens } from "../../middleware/auth.middleware";

const router = express.Router();

// Register a new user
router.post("/register", authControllers.register);

// Log in a user
router.post("/login", authControllers.login);

// Logout a user
router.post("/logout", authControllers.logout);

// Logout and rotate refresh token id
router.post("/logout-on-all", authenticateTokens, authControllers.logoutOnAll);

// Checks if a username if available or not
router.get("/check-username", authControllers.checkUsername);

export default router;

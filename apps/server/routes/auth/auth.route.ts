import express from "express";
import authControllers from "./auth.controller";

const router = express.Router();

// Register a new user
router.post("/register", authControllers.register);

// Log in a user
router.post("/login", authControllers.login);

// Logout a user
router.post("/logout", authControllers.logout);

// Refresh JWT token
router.post("/refresh", authControllers.refreshToken);

// User has forgotten their password
router.post("/forgot-password", authControllers.forgotPassword);

// Reset a users password
router.post("/reset-password", authControllers.resetPassword);

export default router;

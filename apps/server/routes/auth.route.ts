import express from "express";
import authControllers from "../controllers/auth.controller";

const router = express.Router();

// Register a new user
router.post("/auth/register", authControllers.register);

// Log in a user
router.post("/auth/login", authControllers.login);

// Logout a user
router.post("/auth/logout", authControllers.logout);

// Refresh JWT token
router.post("/auth/refresh", authControllers.refreshToken);

// User has forgotten their password
router.post("/auth/forgot-password", authControllers.forgotPassword);

// Reset a users password
router.post("/auth/reset-password", authControllers.resetPassword);

export default router;

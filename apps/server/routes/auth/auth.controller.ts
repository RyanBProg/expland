import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  cookieDefaults,
  generateAccessToken,
  generateRefreshToken,
  setTokenCookie,
} from "./auth.helpers";
import { loginSchema, registerSchema, usernameSchema } from "../../utils/zod/authSchema";
import prisma from "../../database/prismaClient";
import { v4 as uuidv4 } from "uuid";
import { handleControllerError } from "../../utils/handleControllerError";
import { TUserTokenRequest } from "../../utils/types/types";

async function register(req: Request, res: Response) {
  try {
    // Validate req body
    const parsedResult = registerSchema.safeParse(req.body);
    if (!parsedResult.success) {
      if (parsedResult.error.errors[0]?.code === "invalid_type") {
        res.status(422).json({
          message: `${parsedResult.error.errors[0].path[0]} ${parsedResult.error.errors[0].message}`,
        });
        return;
      } else {
        res.status(422).json({
          message: parsedResult.error.errors[0].message,
        });
        return;
      }
    }

    const { givenName, familyName, username, email, password } = parsedResult.data;

    // Check email doesn't exist
    const emailMatch = await prisma.userAccount.findFirst({
      where: { email },
      select: { id: true },
    });
    if (emailMatch) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    // Check username doesn't exist
    const usernameMatch = await prisma.userAccount.findFirst({
      where: { username },
      select: { id: true },
    });
    if (usernameMatch) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create token uuid
    const refreshTokenId = uuidv4();

    // Create the new user account
    const user = await prisma.userAccount.create({
      data: { email, username, passwordHash, givenName, familyName, refreshTokenId },
    });

    // Generate and set tokens in cookies
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id, user.refreshTokenId);
    setTokenCookie(res, "accessToken", accessToken);
    setTokenCookie(res, "refreshToken", refreshToken);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    handleControllerError(error, res, "register");
  }
}

async function login(req: Request, res: Response) {
  try {
    // Validate req body
    const parsedResult = loginSchema.safeParse(req.body);
    if (!parsedResult.success) {
      if (parsedResult.error.errors[0]?.code === "invalid_type") {
        res.status(422).json({
          message: `${parsedResult.error.errors[0].path[0]} ${parsedResult.error.errors[0].message}`,
        });
        return;
      } else {
        res.status(422).json({
          message: parsedResult.error.errors[0].message,
        });
        return;
      }
    }

    const { email, password } = parsedResult.data;

    // Check email doesn't exist
    const userMatch = await prisma.userAccount.findFirst({
      where: { email },
      select: { id: true, passwordHash: true, refreshTokenId: true },
    });
    if (!userMatch) {
      res.status(401).json({ message: "Email or password is incorrect" });
      return;
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, userMatch.passwordHash);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Generate and set tokens in cookies
    const accessToken = generateAccessToken(userMatch.id);
    const refreshToken = generateRefreshToken(userMatch.id, userMatch.refreshTokenId);
    setTokenCookie(res, "accessToken", accessToken);
    setTokenCookie(res, "refreshToken", refreshToken);

    res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (error) {
    handleControllerError(error, res, "login");
  }
}

async function logout(_: Request, res: Response) {
  try {
    // Clear cookies
    res.clearCookie("accessToken", cookieDefaults);
    res.clearCookie("refreshToken", cookieDefaults);

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    handleControllerError(error, res, "logout");
  }
}

async function forgotPassword(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "forgotPassword");
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "resetPassword");
  }
}

const logoutOnAll = async (req: TUserTokenRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Find and update user's refreshTokenId
    await prisma.userAccount.update({
      where: { id: userId },
      data: { refreshTokenId: uuidv4() },
      select: { id: true },
    });

    // Clear cookies
    res.clearCookie("accessToken", cookieDefaults);
    res.clearCookie("refreshToken", cookieDefaults);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    handleControllerError(error, res, "logoutOnAll");
  }
};

async function checkUsername(req: Request, res: Response) {
  try {
    const { username } = req.query;
    if (!username) {
      res.status(400).json({ message: "No username provided" });
      return;
    }

    const parsedResult = usernameSchema.safeParse(username);
    if (!parsedResult.success) {
      res.status(422).json({
        message: parsedResult.error.errors[0].message,
        available: false,
      });
      return;
    }

    const user = await prisma.userAccount.findUnique({
      where: { username: parsedResult.data },
      select: { id: true },
    });

    res.status(200).json({
      available: !user,
      message: user ? "Username is taken" : "Username is available",
    });
  } catch (error) {
    handleControllerError(error, res, "checkUsername");
  }
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  logoutOnAll,
  checkUsername,
};

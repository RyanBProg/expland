import jwt from "jsonwebtoken";
import { env } from "../../utils/zod/envSchema";
import { Response } from "express";
import { CookieDefaults, TokenName } from "../../utils/types/types";

// Generate Access Token
export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// Generate Refresh Token
export function generateRefreshToken(userId: string, refreshTokenId: string) {
  return jwt.sign({ userId, refreshTokenId }, env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// Verify Access Token
export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

// Verify Refresh Token
export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
      userId: string;
      refreshTokenId: string;
    };
  } catch {
    return null;
  }
}

export const cookieDefaults: CookieDefaults = {
  httpOnly: true,
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  secure: env.NODE_ENV === "production" ? true : false,
  // domain: env.NODE_ENV === "production" ? "CHANGE ME" : undefined,
  path: "/",
};

// Set JWT Token Cookie
export function setTokenCookie(res: Response, tokenName: TokenName, token: string) {
  const maxAgeAccessToken = 15 * 60 * 1000; // 15 minutes (in milliseconds)
  const maxAgeRefreshToken = 7 * 24 * 60 * 60 * 1000; // 7 days (in milliseconds)

  res.cookie(tokenName, token, {
    maxAge: tokenName === "accessToken" ? maxAgeAccessToken : maxAgeRefreshToken,
    ...cookieDefaults,
  });
}

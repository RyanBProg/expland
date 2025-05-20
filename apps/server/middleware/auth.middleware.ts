import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { handleControllerError } from "../utils/handleControllerError";
import { generateAccessToken } from "../routes/auth/auth.helpers";
import { setTokenCookie } from "../routes/auth/auth.helpers";
import prisma from "../database/prismaClient";
import { env } from "../utils/zod/envSchema";
import { TUserTokenRequest } from "../utils/types/types";

export async function authenticateTokens(
  req: TUserTokenRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    // Check for an access token on the request
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      // Check for a refresh token on the request
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        console.log("[server] No Refresh Token Provided");
        res.status(401).json({ message: "Unauthorized - No Token Provided" });
        return;
      }

      // See if refresh token is valid
      const refreshDecoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as JwtPayload;
      if (!refreshDecoded.userId) {
        console.log("[server] Invalid Refresh Token Credentials");
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
        return;
      }

      // Does the refresh token match the version in the db
      const user = await prisma.userAccount.findUnique({ where: { id: refreshDecoded.userId } });
      if (!user) {
        console.log("[server] User could not be found in the database");
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
        return;
      }

      if (user.refreshTokenId !== refreshDecoded.refreshTokenId) {
        console.log("[server] Invalid Refresh Token Version");
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
        return;
      }

      // Generate and set new access token in cookies
      const accessToken = generateAccessToken(user.id);
      setTokenCookie(res, "accessToken", accessToken);

      // Attach user to the request
      req.user = { userId: refreshDecoded.userId };

      next();
    } else {
      const accessDecoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET) as JwtPayload;
      if (!accessDecoded.userId) {
        console.log("[server] Invalid Access Token Credentials");
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
        return;
      }

      // attach user to the request
      req.user = { userId: accessDecoded.userId };
      next();
    }
  } catch (error) {
    handleControllerError(error, res, "authenticateTokens");
  }
}

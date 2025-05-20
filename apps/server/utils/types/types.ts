import { CookieOptions, Request } from "express";

// Auth types

export interface TUserTokenRequest extends Request {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
  user?: { userId: string };
}

export type TokenName = "accessToken" | "refreshToken";

export interface CookieDefaults extends CookieOptions {
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none";
  secure: boolean;
  path: string;
}

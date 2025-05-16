import { Request, Response } from "express";

async function register(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function login(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function refreshToken(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function forgotPassword(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

export default {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
};

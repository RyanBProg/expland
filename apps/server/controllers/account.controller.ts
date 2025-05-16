import { Request, Response } from "express";

async function getAccount(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function getProfile(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function updateEmail(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function updatePassword(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function deleteAccount(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function updateProfile(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

async function updateProfilePicture(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error: `, err);
  }
}

export default {
  getAccount,
  getProfile,
  updateEmail,
  updatePassword,
  deleteAccount,
  updateProfile,
  updateProfilePicture,
};

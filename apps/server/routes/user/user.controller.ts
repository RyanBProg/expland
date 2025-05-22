import { Request, Response } from "express";

async function listProfiles(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function getProfileByUserId(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function followUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function unfollowUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function getUserTravels(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

async function getUserTravelbyId(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "testing" });
  } catch (err) {
    console.error(`Error while getting programming languages`, err);
  }
}

export default {
  listProfiles,
  getProfileByUserId,
  followUser,
  unfollowUser,
  getUserTravels,
  getUserTravelbyId,
};

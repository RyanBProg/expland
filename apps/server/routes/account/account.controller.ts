import { Request, Response } from "express";
import { TUserTokenRequest } from "../../utils/types/types";
import prisma from "../../database/prismaClient";
import { handleControllerError } from "../../utils/handleControllerError";
import { userProfileSchema } from "../../utils/zod/accountSchema";

async function getAccount(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.userAccount.findUnique({
      where: { id: userId },
      select: {
        id: true,
        givenName: true,
        familyName: true,
        email: true,
        username: true,
      },
    });
    if (!user) {
      res.status(401).json({ message: "No user account found" });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    handleControllerError(error, res, "getAccount");
  }
}

async function getProfile(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        bio: true,
        location: true,
        profilePictureUrl: true,
      },
    });
    if (!user) {
      res.status(401).json({ message: "No user profile found" });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    handleControllerError(error, res, "getProfile");
  }
}

async function createProfile(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Check if profile already exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });
    if (existingProfile) {
      res.status(409).json({ message: "Profile already exists" });
      return;
    }

    // Validate req body
    const parsedResult = userProfileSchema.safeParse({
      ...req.body,
      userId,
    });
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

    // Create the new user profile
    const profile = await prisma.userProfile.create({
      data: {
        userId,
        bio: parsedResult.data.bio,
        location: parsedResult.data.location,
        profilePictureUrl: parsedResult.data.profilePictureUrl,
      },
    });

    res.status(201).json({
      message: "User profile created successfully",
      data: profile,
    });
  } catch (error) {
    handleControllerError(error, res, "createProfile");
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
  createProfile,
  updateEmail,
  updatePassword,
  deleteAccount,
  updateProfile,
  updateProfilePicture,
};

import { Request, Response } from "express";
import { TUserTokenRequest } from "../../utils/types/types";
import prisma from "../../database/prismaClient";
import { handleControllerError } from "../../utils/handleControllerError";
import { addTravelSchema, userProfileSchema } from "../../utils/zod/accountSchema";

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
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "updateEmail");
  }
}

async function updatePassword(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "updatePassword");
  }
}

async function deleteAccount(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "deleteAccount");
  }
}

async function updateProfile(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "updateProfile");
  }
}

async function updateProfilePicture(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "updateProfilePicture");
  }
}

async function getAllTravels(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const travels = await prisma.travel.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        dateTravel: true,
        duration: true,
        country: {
          select: {
            name: true,
            flagImageUrl: true,
            continent: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        dateTravel: "desc",
      },
    });

    res.status(200).json({ data: travels });
  } catch (error) {
    handleControllerError(error, res, "getAllTravels");
  }
}

async function getTravel(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const travelId = req.params.travelId;
    if (!travelId) {
      res.status(400).json({ message: "Travel ID is required" });
      return;
    }

    const travel = await prisma.travel.findFirst({
      where: { userId, id: parseInt(travelId) },
      select: {
        id: true,
        title: true,
        description: true,
        dateTravel: true,
        duration: true,
        country: {
          select: {
            name: true,
            flagImageUrl: true,
            continent: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });

    res.status(200).json({ data: travel });
  } catch (error) {
    handleControllerError(error, res, "getTravel");
  }
}

async function addTravel(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Validate req body
    const parsedResult = addTravelSchema.safeParse({
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

    const travelData = {
      userId,
      title: parsedResult.data.title,
      description: parsedResult.data.description,
      dateTravel: parsedResult.data.dateTravel,
      duration: parsedResult.data.duration,
      countryId: parsedResult.data.countryId,
      cityId: parsedResult.data.cityId,
    };

    await prisma.travel.create({ data: travelData });

    res.status(200).json({ message: "Travel added successfully" });
  } catch (error) {
    handleControllerError(error, res, "addTravel");
  }
}

async function editTravel(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "editTravel");
  }
}

async function deleteTravel(req: Request, res: Response) {
  try {
    // TODO
    res.status(200).json({ message: "Not implemented yet" });
  } catch (error) {
    handleControllerError(error, res, "deleteTravel");
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
  getAllTravels,
  getTravel,
  addTravel,
  editTravel,
  deleteTravel,
};

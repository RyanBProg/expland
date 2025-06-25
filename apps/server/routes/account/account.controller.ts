import { Request, Response } from "express";
import { TUserTokenRequest, WhereClause } from "../../utils/types/types";
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

    const user = await prisma.userAccount.findFirst({
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

    const user = await prisma.userProfile.findFirst({ where: { userId } });
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
    const existingProfile = await prisma.userProfile.findFirst({
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

    // Get query parameters with defaults
    const page = parseInt(req.query.page as string) || 1;
    const sort = (req.query.sort as string) === "oldest" ? "asc" : "desc";
    const year = parseInt(req.query.year as string);

    // Validate page number
    if (page < 1) {
      res.status(400).json({ message: "Page must be greater than 0" });
      return;
    }

    // Build where clause
    const whereClause: WhereClause = { userId };

    if (year) {
      whereClause.dateTravel = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      };
    }

    // Get total count for pagination
    const totalTravels = await prisma.travel.count({
      where: whereClause,
    });

    const limit = 10;
    const totalPages = Math.ceil(totalTravels / limit);

    // Get paginated results
    const travels = await prisma.travel.findMany({
      where: whereClause,
      select: {
        id: true,
        description: true,
        dateTravel: true,
        duration: true,
        country: {
          select: {
            id: true,
            iso_2: true,
            name: true,
            continents: true,
            independent: true,
            latitude: true,
            longitude: true,
          },
        },
        cities: {
          select: {
            city: {
              select: {
                id: true,
                name: true,
                countryId: true,
                country_iso_2: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
        createdAt: true,
      },
      orderBy: {
        dateTravel: sort,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // transform/flatten cities array to be cleaner
    const transformedTravels = travels.map(travel => ({
      ...travel,
      cities: travel.cities.map(tc => tc.city),
    }));

    res.status(200).json({
      data: transformedTravels,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalTravels,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    handleControllerError(error, res, "getAllTravels");
  }
}

async function getAllTravelsPreview(req: TUserTokenRequest, res: Response) {
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
        dateTravel: true,
        country: {
          select: {
            id: true,
            iso_2: true,
            name: true,
            continents: true,
            independent: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        dateTravel: "asc",
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

    const travelId = parseInt(req.params.travelId);
    if (isNaN(travelId)) {
      res.status(400).json({ message: "Invalid Travel ID" });
      return;
    }

    const travel = await prisma.travel.findFirst({
      where: {
        id: travelId,
        userId,
      },
      select: {
        id: true,
        description: true,
        dateTravel: true,
        duration: true,
        country: {
          select: {
            id: true,
            iso_2: true,
            name: true,
            continents: true,
            independent: true,
            latitude: true,
            longitude: true,
          },
        },
        cities: {
          select: {
            city: {
              select: {
                id: true,
                name: true,
                countryId: true,
                country_iso_2: true,
                latitude: true,
                longitude: true,
                state: true,
                county: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!travel) {
      res.status(404).json({ message: "Travel not found" });
      return;
    }

    // transform/flatten cities array to be cleaner
    const transformedTravel = {
      ...travel,
      cities: travel.cities.map(tc => tc.city),
    };

    res.status(200).json({ data: transformedTravel });
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

    // Create travel with cities in a transaction
    const travel = await prisma.$transaction(async tx => {
      // Create the travel entry
      const newTravel = await tx.travel.create({
        data: {
          userId,
          countryId: parsedResult.data.countryId,
          description: parsedResult.data.description,
          dateTravel: parsedResult.data.dateTravel,
          duration: parsedResult.data.duration,
        },
      });

      // If cities are provided, create the TravelCity relations
      if (parsedResult.data.cityIds && parsedResult.data.cityIds.length > 0) {
        await tx.travelCity.createMany({
          data: parsedResult.data.cityIds.map(cityId => ({
            travelId: newTravel.id,
            cityId,
          })),
        });
      }

      return newTravel;
    });

    res.status(200).json({ message: "Travel added successfully", data: travel });
  } catch (error) {
    handleControllerError(error, res, "addTravel");
  }
}

async function editTravel(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const travelId = parseInt(req.params.travelId);
    if (isNaN(travelId)) {
      res.status(400).json({ message: "Invalid Travel ID" });
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

    // Update travel and cities in a transaction
    const updatedTravel = await prisma.$transaction(async tx => {
      // First, verify the travel belongs to the user
      const existingTravel = await tx.travel.findFirst({
        where: {
          id: travelId,
          userId,
        },
      });

      if (!existingTravel) {
        throw new Error("Travel not found or unauthorized");
      }

      // Delete all existing TravelCity relations
      await tx.travelCity.deleteMany({
        where: { travelId },
      });

      // Create new TravelCity relations if cities provided
      if (parsedResult.data.cityIds.length > 0) {
        await tx.travelCity.createMany({
          data: parsedResult.data.cityIds.map(cityId => ({
            travelId,
            cityId,
          })),
        });
      }
      // Update the travel entry
      const travel = await tx.travel.update({
        where: { id: travelId },
        data: {
          countryId: parsedResult.data.countryId,
          description: parsedResult.data.description,
          dateTravel: parsedResult.data.dateTravel,
          duration: parsedResult.data.duration,
        },
        include: {
          cities: {
            include: {
              city: true,
            },
          },
          country: true,
        },
      });

      return travel;
    });

    res.status(200).json({ message: "Travel updated successfully", data: updatedTravel });
  } catch (error) {
    handleControllerError(error, res, "editTravel");
  }
}

async function deleteTravel(req: TUserTokenRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const travelId = parseInt(req.params.travelId);
    if (isNaN(travelId)) {
      res.status(400).json({ message: "Invalid Travel ID" });
      return;
    }

    // Delete travel and travelcities in a transaction
    await prisma.$transaction(async tx => {
      // First, verify the travel belongs to the user
      const existingTravel = await tx.travel.findFirst({
        where: {
          id: travelId,
          userId,
        },
      });

      if (!existingTravel) {
        throw new Error("Travel not found or unauthorized");
      }

      // Delete all existing TravelCity relations
      await tx.travelCity.deleteMany({
        where: { travelId },
      });

      // delete travel entry
      await tx.travel.delete({ where: { id: travelId } });
    });

    res.status(204).json({ message: "Travel deleted successfully" });
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
  getAllTravelsPreview,
  getTravel,
  addTravel,
  editTravel,
  deleteTravel,
};

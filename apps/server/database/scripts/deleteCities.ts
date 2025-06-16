import prisma from "../prismaClient";

async function deleteAllCities() {
  try {
    await prisma.city.deleteMany({});
    console.log("Successfully deleted all cities");
  } catch (error) {
    console.error("Error deleting cities:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllCities();

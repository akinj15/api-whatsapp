import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connect = async () => {
  try {
    await prisma.$connect();
  }
  catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
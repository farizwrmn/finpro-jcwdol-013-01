import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

const getUserByEmailQuery = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      include: {
        role: true,
      },
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export { getUserByEmailQuery };

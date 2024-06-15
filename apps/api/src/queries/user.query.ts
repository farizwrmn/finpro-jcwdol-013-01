import { IUpdateUser, IUser } from '@/interfaces/user.interface';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getUsersQuery = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (err) {
    throw err;
  }
}

const getUserByIDQuery = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  } catch (err) {
    throw err;
  }
}

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

const createUserQuery = async (userData: IUser): Promise<User> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const user = await prisma.user.create({
          data: {
            ...userData,
            role: {
              connect: {
                name: userData.role || 'customer'
              }
            }
          }
        });

        return user;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
}

const updateUserQuery = async (id: string, data: IUpdateUser) => {
  try {
    const user = await prisma.user.update({
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
      },
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const deleteUserQuery = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.delete({
      where: {
        id
      }
    });

    return user;
  } catch (err) {
    throw err;
  }
}

export { getUsersQuery, getUserByIDQuery, getUserByEmailQuery, createUserQuery, updateUserQuery, deleteUserQuery };

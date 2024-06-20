import {
  IFilterUser,
  IResultUser,
  IUpdatePassword,
  IUpdateUser,
  IUser,
} from '@/interfaces/user.interface';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getUsersQuery = async (filters: IFilterUser): Promise<IResultUser> => {
  try {
    const { keyword = '', page = 1, size = 1000 } = filters;

    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      where: {
        email: {
          contains: keyword,
        },
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.user.aggregate({
      _count: {
        id: true,
      },
      where: {
        email: {
          contains: keyword,
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { users, pages };
  } catch (err) {
    throw err;
  }
};

const getUserByIDQuery = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

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
                name: userData.role || 'store_admin',
              },
            },
          },
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
};

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

const updatePasswordQuery = async (id: string, password: string) => {
  try {
    const user = await prisma.user.update({
      data: {
        password,
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

const updateAvatarQuery = async (id: string, image: string) => {
  try {
    const user = await prisma.user.update({
      data: {
        image,
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
        id,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export {
  getUsersQuery,
  getUserByIDQuery,
  getUserByEmailQuery,
  createUserQuery,
  updateUserQuery,
  updatePasswordQuery,
  updateAvatarQuery,
  deleteUserQuery,
};

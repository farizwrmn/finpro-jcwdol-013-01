import { HttpException } from "@/exceptions/HttpException";
import { createUserQuery, deleteUserQuery, getUserByEmailQuery, getUserByIDQuery, getUsersQuery, updateUserQuery } from "../queries/user.query";
import { IUser } from '@/interfaces/user.interface';
import { User } from '@prisma/client';

const getUsersAction = async (): Promise<User[]> => {
  try {
    const users = await getUsersQuery();
    return users;
  } catch (err) {
    throw err;
  }
}

const getUserByIDAction = async (id: string): Promise<User | null> => {
  try {
    const user = await getUserByIDQuery(id);

    if (!user) throw new HttpException(404, "Data not found");

    return user;
  } catch (err) {
    throw err;
  }
}

const createUserAction = async (userData: IUser): Promise<User> => {
  try {
    const existUser = await getUserByEmailQuery(userData.email as string);

    if (existUser) throw new Error("User already exists");

    const user = await createUserQuery(userData);
    return user;
  } catch (err) {
    throw err;
  }
}

const updateUserAction = async (id: string, data: IUser): Promise<User> => {
  try {
    const user = await updateUserQuery(id, data);
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteUserAction = async (id: string): Promise<User> => {
  try {
    const user = await deleteUserQuery(id);
    return user;
  } catch (err) {
    throw err;
  }
}

export {
  getUsersAction,
  getUserByIDAction,
  createUserAction,
  updateUserAction,
  deleteUserAction
};

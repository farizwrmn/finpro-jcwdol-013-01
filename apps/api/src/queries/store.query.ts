import { PrismaClient, Store } from "@prisma/client";
import { IStore } from "../interfaces/store.interface";

const prisma = new PrismaClient();

const getStoresQuery = async (): Promise<Store[]> => {
  try {
    const stores = await prisma.store.findMany({});
    return stores;
  } catch (err) {
    throw err;
  }
}

const getStoreByIDQuery = async (id: string): Promise<Store | null> => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id
      }
    });

    return store;
  } catch (err) {
    throw err;
  }
}

const getStoreByNameQuery = async (name: string): Promise<Store | null> => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        name
      }
    });

    return store;
  } catch (err) {
    throw err;
  }
}

const createStoreQuery = async (storeData: IStore): Promise<Store> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const store = await prisma.store.create({
          data: {
            ...storeData,
          }
        });

        return store;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
}

const updateStoreQuery = async (
  id: string,
  storeData: IStore
): Promise<Store> => {
  try {
    const store = await prisma.store.update({
      data: {
        ...storeData,
      },
      where: {
        id
      }
    });

    return store;
  } catch (err) {
    throw err;
  }
}

const deleteStoreQuery = async (id: string): Promise<Store> => {
  try {
    const store = await prisma.store.delete({
      where: {
        id
      }
    });

    return store;
  } catch (err) {
    throw err;
  }
}

export {
  getStoresQuery,
  getStoreByIDQuery,
  getStoreByNameQuery,
  createStoreQuery,
  updateStoreQuery,
  deleteStoreQuery,
}
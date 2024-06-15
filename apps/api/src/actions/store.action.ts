import { Store } from "@prisma/client";
import { createStoreQuery, deleteStoreQuery, getStoreByIDQuery, getStoreByNameQuery, getStoresQuery, updateStoreQuery } from "../queries/store.query";
import { HttpException } from "../exceptions/HttpException";
import { IFilterStore, IResultStore, IStore } from "../interfaces/store.interface";

const getStoresAction = async (filters: IFilterStore): Promise<IResultStore> => {
  try {
    const data = await getStoresQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
}

const getStoreByIDAction = async (id: string): Promise<Store | null> => {
  try {
    const store = await getStoreByIDQuery(id);

    if (!store) throw new HttpException(404, "Data not found");

    return store;
  } catch (err) {
    throw err;
  }
}

const createStoreAction = async (storeData: IStore): Promise<Store> => {
  try {
    const existStore = await getStoreByNameQuery(storeData.name);

    if (existStore) throw new Error("Store name already exists");

    const store = await createStoreQuery(storeData);
    return store;
  } catch (err) {
    throw err;
  }
}

const updateStoreAction = async (
  id: string,
  storeData: IStore
): Promise<Store> => {
  try {
    const store = await updateStoreQuery(id, storeData);
    return store;
  } catch (err) {
    throw err;
  }
}

const deleteStoreAction = async (id: string): Promise<Store> => {
  try {
    const store = await deleteStoreQuery(id);
    return store;
  } catch (err) {
    throw err;
  }
}

export {
  getStoresAction,
  getStoreByIDAction,
  createStoreAction,
  updateStoreAction,
  deleteStoreAction,
}
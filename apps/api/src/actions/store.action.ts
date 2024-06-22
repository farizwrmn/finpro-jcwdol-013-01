import { Store } from "@prisma/client";
import { createStoreQuery, deleteStoreQuery, getStoreByIDQuery, getStoreByNameQuery, getStoresQuery, updateStoreQuery } from "../queries/store.query";
import { HttpException } from "../exceptions/HttpException";
import { IFilterStore, IUserLocation, IResultStore, IStore } from "../interfaces/store.interface";
import haversine from "haversine";

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

const getDistanceStoresAction = async (userLocation: IUserLocation) => {
  try {
    const { stores } = await getStoresQuery({});

    const distanceStores = stores.map(store => {
      const distance =
        (userLocation.longitude && userLocation.latitude && store.longitude && store.latitude)
          ? haversine({
            longitude: userLocation.longitude,
            latitude: userLocation.latitude
          }, {
            longitude: store.longitude,
            latitude: store.latitude
          })
          : null;
      return { ...store, distance };
    });

    return distanceStores.sort((a, b) => (a.distance as number) - (b.distance as number));
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
  getDistanceStoresAction,
  createStoreAction,
  updateStoreAction,
  deleteStoreAction,
}
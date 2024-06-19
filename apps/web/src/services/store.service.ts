import { IFilterStore } from "@/interface/store.interface";
import instance from "@/utils/axiosInstance";

export const getStores = async ({ keyword = "", page = 1, size = 10 }: IFilterStore) => {
  try {
    const { data } = await instance.get(`/stores?keyword=${keyword}&page=${page}&size=${size}`);
    const stores = data?.data;
    return stores;
  } catch (err) {
    console.error(err);
  }
};

export const getStoreByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/stores/${id}`);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const createStore = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.post('/stores', formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const updateStore = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.patch(`/stores/${id}`, formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const deleteStore = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.delete(`/stores/${id}`, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};
import instance from "@/utils/axiosInstance";

export const getProvinces = async () => {
  try {
    const { data } = await instance.get('http://localhost:3000/api/provinces');
    const provinces = data?.provinces;
    return provinces;
  } catch (err) {
    console.error(err);
  }
};

export const getCities = async (provinceId: string) => {
  try {
    const { data } = await instance.get(`http://localhost:3000/api/cities?provinceId=${provinceId}`);
    const cities = data?.cities;
    return cities;
  } catch (err) {
    console.error(err);
  }
};

export const getSubdistricts = async (cityId: string) => {
  try {
    const { data } = await instance.get(`http://localhost:3000/api/subdistricts?cityId=${cityId}`);
    const subdistricts = data?.subdistricts;
    return subdistricts;
  } catch (err) {
    console.error(err);
  }
};

export const getStores = async () => {
  try {
    const { data } = await instance.get('/stores');
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
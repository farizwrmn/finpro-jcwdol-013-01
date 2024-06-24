import instance from "@/utils/axiosInstance";

export const getProvinces = async () => {
  try {
    const { data } = await instance.get('/shipping/provinces');
    const provinces = data?.data;
    return provinces;
  } catch (err) {
    console.error(err);
  }
};

export const getCities = async (provinceId: string) => {
  try {
    const { data } = await instance.get(`/shipping/cities?provinceId=${provinceId}`);
    const cities = data?.data;
    return cities;
  } catch (err) {
    console.error(err);
  }
};

export const getSubdistricts = async (cityId: string) => {
  try {
    const { data } = await instance.get(`/shipping/subdistricts?cityId=${cityId}`);
    const subdistricts = data?.data;
    return subdistricts;
  } catch (err) {
    console.error(err);
  }
};

export const getCouriers = async (origin: string, destination: string) => {
  try {
    const { data } = await instance.get(`/shipping/couriers?origin=${origin}&destination=${destination}`);
    const couriers = data?.data;
    return couriers;
  } catch (err) {
    console.error(err);
  }
};

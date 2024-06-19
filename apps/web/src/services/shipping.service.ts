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


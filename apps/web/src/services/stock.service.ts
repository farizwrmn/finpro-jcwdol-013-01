import instance from '@/utils/axiosInstance';

export const createStock = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/stocks', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const getStocksByProductID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/stocks/product/${id}`, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.error(err);
  }
};

export const addStock = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/stocks/${id}`, formData, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.error(err);
  }
};

export const getStockById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/stocks/product/${id}`, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.error(err);
  }
};

export const updateStock = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/stocks/${id}`, formData, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.error(err);
  }
};

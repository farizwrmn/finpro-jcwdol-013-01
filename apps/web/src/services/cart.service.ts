import instance from '@/utils/axiosInstance';

export const getCartByUserID = async (id: string) => {
  try {
    const { data } = await instance.get(`/cart/${id}`);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const createCartItem = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/cart', formData, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCart = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/cart/${id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

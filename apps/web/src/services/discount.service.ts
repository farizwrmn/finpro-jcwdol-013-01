import instance from '@/utils/axiosInstance';

export const createDiscount = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/discounts', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

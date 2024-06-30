import { IFilterDiscount } from '@/interface/discount.interface';
import instance from '@/utils/axiosInstance';

export const getDiscounts = async ({
  keyword = '',
  page = 1,
  size = 10,
}: IFilterDiscount) => {
  try {
    const { data } = await instance.get(`/discounts`);
    const discounts = data?.data;
    return discounts;
  } catch (err) {
    console.error(err);
  }
};

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

export const getDiscountsByStoreID = async (storeId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/discounts/store/${storeId}`, config);
    const discounts = data?.data;
    return discounts;
  } catch (err) {
    console.error(err);
  }
};

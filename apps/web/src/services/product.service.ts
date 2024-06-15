import { IFilterProduct } from "@/interface/product.interface";
import instance from "@/utils/axiosInstance";

export const getProducts = async ({ keyword = "", page = 1, size = 10 }: IFilterProduct) => {
  try {
    const { data } = await instance.get(`/products?keyword=${keyword}&page=${page}&size=${size}`);
    const products = data?.data;
    return products;
  } catch (err) {
    console.error(err);
  }
};

export const getProductByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await instance.get(`/products/slug/${slug}`);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const createProduct = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.post('/products', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.patch(`/products/${id}`, formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.delete(`/products/${id}`, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};
import { PrismaClient, Product } from "@prisma/client";
import { IProduct } from "../interfaces/product.interface";

const prisma = new PrismaClient();

const getProductsQuery = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({});
    return products;
  } catch (err) {
    throw err;
  }
}

const getProductByIDQuery = async (id: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    });

    return product;
  } catch (err) {
    throw err;
  }
}

const getProductBySlugOrNameQuery = async (slug: string, name: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          {
            slug,
          },
          {
            name,
          },
        ],
      }
    });

    return product;
  } catch (err) {
    throw err;
  }
}

const createProductQuery = async (productData: IProduct): Promise<Product> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const product = await prisma.product.create({
          data: {
            ...productData,
          }
        });

        return product;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
}

const updateProductQuery = async (
  id: string,
  productData: IProduct
): Promise<Product> => {
  try {
    const product = await prisma.product.update({
      data: {
        ...productData,
      },
      where: {
        id
      }
    });

    return product;
  } catch (err) {
    throw err;
  }
}

const deleteProductQuery = async (id: string): Promise<Product> => {
  try {
    const product = await prisma.product.delete({
      where: {
        id
      }
    });

    return product;
  } catch (err) {
    throw err;
  }
}

export {
  getProductsQuery,
  getProductByIDQuery,
  getProductBySlugOrNameQuery,
  createProductQuery,
  updateProductQuery,
  deleteProductQuery,
}
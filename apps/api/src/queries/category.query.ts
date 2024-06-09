import { PrismaClient, Category } from "@prisma/client";
import { ICategory } from "../interfaces/category.interface";

const prisma = new PrismaClient();

const getCategoriesQuery = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({});
    return categories;
  } catch (err) {
    throw err;
  }
}

const getCategoryByIDQuery = async (id: string): Promise<Category | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    });

    return category;
  } catch (err) {
    throw err;
  }
}

const getCategoryBySlugOrNameQuery = async (slug: string, name: string): Promise<Category | null> => {
  try {
    const category = await prisma.category.findFirst({
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

    return category;
  } catch (err) {
    throw err;
  }
}

const createCategoryQuery = async (categoryData: ICategory): Promise<Category> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const category = await prisma.category.create({
          data: {
            ...categoryData,
          }
        });

        return category;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
}

const updateCategoryQuery = async (
  id: string,
  categoryData: ICategory
): Promise<Category> => {
  try {
    const category = await prisma.category.update({
      data: {
        ...categoryData,
      },
      where: {
        id
      }
    });

    return category;
  } catch (err) {
    throw err;
  }
}

const deleteCategoryQuery = async (id: string): Promise<Category> => {
  try {
    const category = await prisma.category.delete({
      where: {
        id
      }
    });

    return category;
  } catch (err) {
    throw err;
  }
}

export {
  getCategoriesQuery,
  getCategoryByIDQuery,
  getCategoryBySlugOrNameQuery,
  createCategoryQuery,
  updateCategoryQuery,
  deleteCategoryQuery,
}
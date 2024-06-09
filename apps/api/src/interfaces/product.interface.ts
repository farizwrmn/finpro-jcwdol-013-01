export interface IProduct {
  name: string;
  slug: string;
  description: string;
  image?: string;
  slicedPrice: number;
  sellingPrice: number;
  createdBy?: string;
  updatedBy?: string;
  categoryId: string;
}
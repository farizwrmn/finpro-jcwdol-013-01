import { UserAddress } from "@prisma/client";

export interface IAddress {
  userId: string;
  label: string;
  address: string;
  subdistrictId: number;
  subdistrictName: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface IFilterAddress {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultAddress {
  addresses: UserAddress[];
  pages: number;
}
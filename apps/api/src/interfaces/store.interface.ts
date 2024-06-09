export interface IStore {
  name: string;
  address: string;
  subdistrictId: number;
  subdistrictName: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  postalCode?: string;
  longitude?: string;
  latitude?: string;
}
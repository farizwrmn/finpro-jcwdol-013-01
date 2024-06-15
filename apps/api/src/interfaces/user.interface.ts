export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string;
  gender?: string;
  birthDate?: Date;
  role?: string;
  longitude?: number;
  latitude?: number;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string;
  gender?: string;
  birthDate?: Date;
  longitude?: number;
  latitude?: number;
}

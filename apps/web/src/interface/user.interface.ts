export interface IUsers {
  email: string;
  password: string;
}

export interface IUserProfile {
  name?: string;
  email: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
}

export interface IUserPassword {
  currentPassword: string;
  newPassword: string;
}
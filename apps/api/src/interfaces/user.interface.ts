export interface User {
  email: string;
  password: string;
  isVerified: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

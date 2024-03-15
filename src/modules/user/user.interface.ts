import { Model } from "mongoose";

export type IUser = {
  id: string;
  password: string;
  email: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
};

export interface UserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
}

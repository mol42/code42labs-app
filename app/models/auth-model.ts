import { UserModel } from "./user-model";

export type AuthResponseData = {
  user: UserModel;
  xAuthToken: string;
};

export type AuthResponseDataType = AuthResponseData | any;

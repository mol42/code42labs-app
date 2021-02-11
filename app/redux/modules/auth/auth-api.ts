import { doPost } from "../../../services/custom-http-service";
import {
  ApiResponse,
  AuthResponseDataType,
} from "../../../models/auth-response";
import { UserCredentials, NewUser } from "./auth-types";

export async function authApi_login(
  loginUser: UserCredentials,
): Promise<ApiResponse<AuthResponseDataType>> {
  const loginResult: ApiResponse<AuthResponseDataType> = await doPost(
    "http://localhost:3000/auth/login",
    null,
    loginUser,
  );
  return loginResult;
}

export async function authApi_signup(
  newUser: NewUser,
): Promise<ApiResponse<AuthResponseDataType>> {
  const signupResult: ApiResponse<AuthResponseDataType> = await doPost(
    "http://localhost:3000/auth/signup",
    null,
    newUser,
  );
  return signupResult;
}

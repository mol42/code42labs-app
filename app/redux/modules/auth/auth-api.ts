import { doPost } from "../../../services/custom-http-service";
import { AuthResponseDataType } from "../../../models/auth-model";
import { ApiResponse } from "../../../models/generic-api-response";
import { UserCredentials, NewUser } from "./auth-types";
import { API_URL } from "@env";

export async function authApi_login(
  loginUser: UserCredentials
): Promise<ApiResponse<AuthResponseDataType>> {
  const loginResult: ApiResponse<AuthResponseDataType> = await doPost(
    `${API_URL}/auth/login`,
    null,
    loginUser
  );
  return loginResult;
}

export async function authApi_signup(
  newUser: NewUser
): Promise<ApiResponse<AuthResponseDataType>> {
  const signupResult: ApiResponse<AuthResponseDataType> = await doPost(
    `${API_URL}/auth/signup`,
    null,
    newUser
  );
  return signupResult;
}

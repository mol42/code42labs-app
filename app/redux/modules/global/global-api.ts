import { doPost } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";
import { UserModel } from "../../../models/user-model";
import { API_URL } from "@env";

export async function globalApi_updateTheme(theme: number): Promise<
  ApiResponse<UserModel>
  > {
  const apiResult: ApiResponse<UserModel> = await doPost(
    `${API_URL}/auth/update/theme`,
    null,
    { theme }
  );
  return apiResult;
}

export async function globalApi_updateLanguage(language: number): Promise<
  ApiResponse<UserModel>
  > {
  const apiResult: ApiResponse<UserModel> = await doPost(
    `${API_URL}/auth/update/language`,
    null,
    { language }
  );
  return apiResult;
}

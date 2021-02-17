import { doPost } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";
import { UserModel } from "../../../models/user-model";

export async function globalApi_updateTheme(theme: number): Promise<
  ApiResponse<UserModel>
  > {
  const apiResult: ApiResponse<UserModel> = await doPost(
    "http://localhost:3000/auth/update/theme",
    null,
    { theme }
  );
  return apiResult;
}

export async function globalApi_updateLanguage(language: number): Promise<
  ApiResponse<UserModel>
  > {
  const apiResult: ApiResponse<UserModel> = await doPost(
    "http://localhost:3000/auth/update/language",
    null,
    { language }
  );
  return apiResult;
}

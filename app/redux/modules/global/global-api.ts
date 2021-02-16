import { doPost } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";
import { UserModel } from "../../../models/user-model";

export async function globalApi_updateTheme(theme: string): Promise<
  ApiResponse<UserModel>
  > {
  const allSkilsResult: ApiResponse<UserModel> = await doPost(
    "http://localhost:3000/auth/update/theme",
    null,
    { theme }
  );
  return allSkilsResult;
}

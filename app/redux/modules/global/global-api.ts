import { doPost } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";

export async function globalApi_updateTheme(theme: string): Promise<
  ApiResponse<any>
  > {
  const allSkilsResult: ApiResponse<any> = await doPost(
    "http://localhost:3000/auth/update/theme",
    null,
    { theme }
  );
  return allSkilsResult;
}

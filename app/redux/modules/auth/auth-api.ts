import { doPost } from "../../../services/custom-http-service";
import { ApiResponse, AuthResponseData } from "../../../models/auth-response";
import { UserCredentials } from "./auth-types";

export async function authApi_login(loginUser: UserCredentials): Promise<ApiResponse<AuthResponseData>> {
    const loginResult: ApiResponse<AuthResponseData> = await doPost("http://localhost:3000/auth/login", loginUser);
    return loginResult;
}
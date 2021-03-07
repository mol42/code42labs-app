import { doGet } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";
import { SkillNewsModel } from "../../../models/skill-news-model";
import { API_URL } from "@env";

export async function skillNewsApi_fetchAllSkillNews(): Promise<
  ApiResponse<Array<SkillNewsModel>>
  > {
  const allSkilNewsResult: ApiResponse<Array<SkillNewsModel>> = await doGet(
    `${API_URL}/skill-news/favorites/all`,
    null
  );
  return allSkilNewsResult;
}

import { doGet, doPost } from "../../../services/custom-http-service";
import { ApiResponse } from "../../../models/generic-api-response";
import { SkillNewsModel } from "../../../models/skill-news-model";

export async function skillNewsApi_fetchAllSkillNews(): Promise<
  ApiResponse<Array<SkillNewsModel>>
  > {
  const allSkilNewsResult: ApiResponse<Array<SkillNewsModel>> = await doGet(
    "http://localhost:3000/skill-news/favorites/all",
    null
  );
  return allSkilNewsResult;
}

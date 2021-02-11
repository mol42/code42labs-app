import { doGet } from "../../../services/custom-http-service";
import {
  ApiResponse,
  SkillsResponseDataType,
} from "../../../models/skills-response";

export async function skillsApi_fetchAllSkills(): Promise<
  ApiResponse<SkillsResponseDataType>
> {
  const allSkilsResult: ApiResponse<SkillsResponseDataType> = await doGet(
    "http://localhost:3000/skills/all",
    null,
  );
  return allSkilsResult;
}

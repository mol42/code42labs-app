import { doGet } from "../../../services/custom-http-service";
import {
  ApiResponse,
  SkillsResponseDataType,
} from "../../../models/skills-response";
import {
  SkillStepsResponseDataType,
} from "../../../models/skill-step-response";


export async function skillsApi_fetchAllSkills(): Promise<
  ApiResponse<SkillsResponseDataType>
> {
  const allSkilsResult: ApiResponse<SkillsResponseDataType> = await doGet(
    "http://localhost:3000/skills/all",
    null,
  );
  return allSkilsResult;
}

export async function skillsApi_fetchSkillSteps(skillId: number): Promise<
  ApiResponse<SkillStepsResponseDataType>
> {
  const allSkillStepsResults: ApiResponse<SkillStepsResponseDataType> = await doGet(
    `http://localhost:3000/skills/${skillId}/steps/all`,
    null,
  );
  return allSkillStepsResults;
}


import { doGet, doPost } from "../../../services/custom-http-service";
import { SkillsResponseDataType } from "../../../models/skills-model";
import { SkillStepsResponseDataType } from "../../../models/skill-step-model";
import { SkillStepResourcesResponseDataType } from "../../../models/skill-step-resource-model";
import { ApiResponse } from "../../../models/generic-api-response";

export async function skillsApi_fetchAllSkills(): Promise<
  ApiResponse<SkillsResponseDataType>
  > {
  const allSkilsResult: ApiResponse<SkillsResponseDataType> = await doGet(
    "http://localhost:3000/skills/all",
    null
  );
  return allSkilsResult;
}

export async function skillsApi_fetchSkillSteps(
  skillId: number
): Promise<ApiResponse<SkillStepsResponseDataType>> {
  const allSkillStepsResults: ApiResponse<SkillStepsResponseDataType> = await doGet(
    `http://localhost:3000/skills/${skillId}/steps/all`,
    null
  );
  return allSkillStepsResults;
}

export async function skillsApi_fetchAllSkillStepResources(
  skillId: number,
  skillStepId: number
): Promise<ApiResponse<SkillStepResourcesResponseDataType>> {
  const allSkillStepResourcesResults: ApiResponse<SkillStepResourcesResponseDataType> = await doGet(
    `http://localhost:3000/skills/${skillId}/steps/${skillStepId}/resources/all`,
    null
  );
  return allSkillStepResourcesResults;
}

export async function skillsApi_updateSkillFavorites(
  skillId: number,
  isFavorite: boolean
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doPost(
    `http://localhost:3000/skills/${skillId}/favorites/update`,
    null,
    {
      skillId,
      isFavorite
    }
  );
  return skillStepfavoritingResponse;
}

export async function skillsApi_fetchAllFavoriteSkills(
  skillId: number
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doGet(
    "http://localhost:3000/skills/favorites/all",
    null
  );
  return skillStepfavoritingResponse;
}

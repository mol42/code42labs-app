import { doGet, doPost } from "../../../services/custom-http-service";
import { SkillsResponseDataType } from "../../../models/skills-model";
import { SkillStepsResponseDataType } from "../../../models/skill-step-model";
import { SkillStepResourcesResponseDataType } from "../../../models/skill-step-resource-model";
import { ApiResponse } from "../../../models/generic-api-response";
import { API_URL } from "@env";

export async function skillsApi_fetchAllSkills(): Promise<
  ApiResponse<SkillsResponseDataType>
  > {
  const allSkilsResult: ApiResponse<SkillsResponseDataType> = await doGet(
    `${API_URL}/skills/all`,
    null
  );
  return allSkilsResult;
}

export async function skillsApi_fetchSkillSteps(
  skillId: number
): Promise<ApiResponse<SkillStepsResponseDataType>> {
  const allSkillStepsResults: ApiResponse<SkillStepsResponseDataType> = await doGet(
    `${API_URL}/skills/${skillId}/steps/all`,
    null
  );
  return allSkillStepsResults;
}

export async function skillsApi_fetchAllSkillStepResources(
  skillId: number,
  skillStepId: number
): Promise<ApiResponse<SkillStepResourcesResponseDataType>> {
  const allSkillStepResourcesResults: ApiResponse<SkillStepResourcesResponseDataType> = await doGet(
    `${API_URL}/skills/${skillId}/steps/${skillStepId}/resources/all`,
    null
  );
  return allSkillStepResourcesResults;
}

export async function skillsApi_updateSkillFavorites(
  skillId: number,
  isFavorite: boolean
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doPost(
    `${API_URL}/skills/${skillId}/favorites/update`,
    null,
    {
      skillId,
      isFavorite
    }
  );
  return skillStepfavoritingResponse;
}

export async function skillsApi_fetchAllFavoriteSkills(
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doGet(
    `${API_URL}/skills/favorites/all`,
    null
  );
  return skillStepfavoritingResponse;
}

export async function skillsApi_fetchSkillStepProgress(
  skillId: number
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doGet(
    `${API_URL}/skills/${skillId}/progress/all`,
    null
  );
  return skillStepfavoritingResponse;
}

export async function skillsApi_updateSkillStepProgress(
  skillId: number,
  skillStepId: number,
  isCompleted: boolean
): Promise<ApiResponse<any>> {
  const skillStepfavoritingResponse: ApiResponse<any> = await doPost(
    `${API_URL}/skills/${skillId}/progress/update`,
    null,
    {
      skillId,
      skillStepId,
      isCompleted
    }
  );
  return skillStepfavoritingResponse;
}

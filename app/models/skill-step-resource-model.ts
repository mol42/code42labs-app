export type SkillStepResourceModel = {
  id: number,
  skillId: number,
  skillStepId: number,
  type: number,
  languageId: number,
  data: Record<string, string>,
  createdAt: Date,
  updatedAt: Date
  };

export type SkillStepResourcesResponseDataType = Array<SkillStepResourceModel> | any;


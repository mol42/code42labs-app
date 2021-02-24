export type SkillStepModel = {
  id: number,
  skillId: number,
  name: string,
  order: number,
  shortDescription: string,
  longDescription: string,
  createdAt: Date,
  updatedAt: Date
};

export type SkillStepsResponseDataType = Array<SkillStepModel> | any;

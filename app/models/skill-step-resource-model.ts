export type SkillStepResourceModel = {
    id: number,
    skillId: number,
    name: string,
    order: number,
    shortDescription: string,
    longDescription: string,
    createdAt: Date,
    updatedAt: Date
  };

export type SkillStepResourcesResponseDataType = Array<SkillStepResourceModel> | any;


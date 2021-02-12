export type SkillModel = {
  id: number;
  name: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  skillTypeId: number;
  createdAt: string;
  updatedAt: string;
};

export type SkillsResponseDataType = Array<SkillModel> | any;

export type SkillNewsModel = {
    id: number,
    skillId: number,
    title: string,
    smallImage: string,
    largeImage: string,
    summary: string,
    content: string,
    languageId: number,
    publishDate: Date,
    createdAt: Date,
    updatedAt: Date
  };

export type SkillNewsResponseDataType = Array<SkillNewsModel> | any;


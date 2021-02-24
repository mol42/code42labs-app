export type SkillStepProgressModel = {
    id: number,
    userId: number,
    skillId: number,
    progress: Record<string, string>,
    createdAt: Date,
    updatedAt: Date
};

export type SkillStepProgressResponseDataType = Array<SkillStepProgressModel> | any;



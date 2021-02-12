export type ApiResponse<T> = {
    status: string;
    data: T;
};

export type SkillStepModel = {
    id: number;
    name: string;
    image: string,
    shortDescription: string;
    longDescription: string;
    skillTypeId: number;
    createdAt: string;
    updatedAt: string;
};

export type SkillStepsResponseDataType = Array<SkillStepModel> | any;

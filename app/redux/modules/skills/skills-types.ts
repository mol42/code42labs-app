import { SkillModel } from "../../../models/skills-model";
import { SkillStepModel } from "../../../models/skill-step-model";
import { SkillStepResourceModel } from "../../../models/skill-step-resource-model";

export type SkillsState = {
  allSkills: Array<SkillModel>;
  selectedSkill: SkillModel | null;
  selectedSkillSteps: Array<SkillStepModel>;
  selectedSkillStep: SkillStepModel | null;
  selectedSkillStepResources: Array<SkillStepResourceModel>;
  favoriteSkills: Array<SkillModel>;
};


import { SkillModel } from "../../../models/skills-response";
import { SkillStepModel } from "../../../models/skill-step-response";

export type SkillsState = {
    allSkills: Array<SkillModel>;
    selectedSkill: SkillModel | null,
    selectedSkillSteps: Array<SkillStepModel>
}
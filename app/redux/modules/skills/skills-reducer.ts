import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { skillsApi_fetchAllSkills, skillsApi_fetchSkillSteps } from "./skills-api";
import { SkillsState } from "./skills-types";
// import { showMessage } from "react-native-flash-message";
import { ErrorCodesMap } from "../../../config/error-constants";
import { SkillModel } from "../../../models/skills-response";
import { SkillStepModel } from "../../../models/skill-step-response";

export const fetchAllSkills = createAsyncThunk("skills/fetchAllSkills", async (_: any, thunkAPI: any) => {
  try {
    const skillsResult = await skillsApi_fetchAllSkills();
    if (skillsResult.status === "ok") {
      thunkAPI.dispatch(setAllSkills(skillsResult.data));
    }
  } catch (err) { }
});

export const fetchSkillSteps = createAsyncThunk<any, number, { rejectValue: any }>("skills/fetchSkillSteps", async (skillId: number, thunkAPI: any) => {
  try {
    const skillStepsResult = await skillsApi_fetchSkillSteps(skillId);
    if (skillStepsResult.status === "ok") {
      thunkAPI.dispatch(setSelectedSkillSteps(skillStepsResult.data));
    }
  } catch (err) { }
});

const initialState: SkillsState = {
  allSkills: [],
  selectedSkill: null,
  selectedSkillSteps: []
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setAllSkills(state, { payload }: PayloadAction<Array<SkillModel>>): void {
      state.allSkills = payload;
    },
    setSelectedSkill(state, { payload }: PayloadAction<SkillModel>): void {
      state.selectedSkill = payload;
    },
    setSelectedSkillSteps(state, { payload }: PayloadAction<Array<SkillStepModel>>): void {
      state.selectedSkillSteps = payload;
    }
  },
  extraReducers: (builder: any) => {

  },
});

export const {
  setAllSkills,
  setSelectedSkill,
  setSelectedSkillSteps,
} = skillsSlice.actions;

export default skillsSlice.reducer;

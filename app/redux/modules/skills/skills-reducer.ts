import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  skillsApi_fetchAllSkills,
  skillsApi_fetchSkillSteps,
  skillsApi_fetchAllSkillStepResources,
  skillsApi_updateSkillFavorites,
  skillsApi_fetchAllFavoriteSkills
} from "./skills-api";
import { SkillsState } from "./skills-types";
// import { showMessage } from "react-native-flash-message";
// import { ErrorCodesMap } from "../../../config/error-constants";
import { SkillModel } from "../../../models/skills-model";
import { SkillStepModel } from "../../../models/skill-step-model";
import { SkillStepResourceModel } from "../../../models/skill-step-resource-model";

export const fetchAllSkills = createAsyncThunk(
  "skills/fetchAllSkills",
  async (_: any, thunkAPI: any) => {
    try {
      const skillsResult = await skillsApi_fetchAllSkills();
      if (skillsResult.status === "ok") {
        thunkAPI.dispatch(setAllSkills(skillsResult.data));
      }
    } catch (err) {}
  }
);

export const fetchSkillSteps = createAsyncThunk("skills/fetchSkillSteps", async (skillId: number, thunkAPI: any) => {
  try {
    const skillStepsResult = await skillsApi_fetchSkillSteps(skillId);
    if (skillStepsResult.status === "ok") {
      thunkAPI.dispatch(setSelectedSkillSteps(skillStepsResult.data));
    }
  } catch (err) {}
});

export const fetchSkillStepResources = createAsyncThunk(
  "skills/fetchSkillStepResources",
  async ({ skillId, skillStepId }: {skillId: number, skillStepId: number}, thunkAPI: any) => {
    try {
      const skillStepResources = await skillsApi_fetchAllSkillStepResources(skillId, skillStepId);
      if (skillStepResources.status === "ok") {
        thunkAPI.dispatch(setSelectedSkillStepResources(skillStepResources.data));
      }
    } catch (err) {}
  }
);

export const updateSkillFavorites = createAsyncThunk(
  "skills/updateSkillFavorites",
  async ({ skillId, isFavorite }: {skillId: number, isFavorite : boolean}, thunkAPI: any) => {
    try {
      const skillStepResources = await skillsApi_updateSkillFavorites(skillId, isFavorite);
      if (skillStepResources.status === "ok") {
        thunkAPI.dispatch(fetchAllFavoriteSkills(skillId));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAllFavoriteSkills = createAsyncThunk(
  "skills/fetchAllFavoriteSkills",
  async (_ :any, thunkAPI: any) => {
    try {
      const skillStepResources = await skillsApi_fetchAllFavoriteSkills();
      if (skillStepResources.status === "ok") {
        thunkAPI.dispatch(setSkillFavorites(skillStepResources.data));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: SkillsState = {
  allSkills: [],
  selectedSkill: null,
  selectedSkillSteps: [],
  selectedSkillStep: null,
  selectedSkillStepResources: [],
  favoriteSkills: []
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
    setSelectedSkillSteps(
      state,
      { payload }: PayloadAction<Array<SkillStepModel>>
    ): void {
      state.selectedSkillSteps = payload;
    },
    setSelectedSkillStep(
      state,
      { payload }: PayloadAction<SkillStepModel>
    ): void {
      state.selectedSkillStep = payload;
    },
    setSelectedSkillStepResources(
      state,
      { payload }: PayloadAction<Array<SkillStepResourceModel>>
    ): void {
      state.selectedSkillStepResources = payload;
    },
    setSkillFavorites(
      state,
      { payload }: PayloadAction<Array<SkillModel>>
    ): void {
      state.favoriteSkills = payload;
    },
  },
  extraReducers: (builder: any) => {
    console.log("");
  },
});

export const {
  setAllSkills,
  setSelectedSkill,
  setSelectedSkillSteps,
  setSelectedSkillStep,
  setSelectedSkillStepResources,
  setSkillFavorites
} = skillsSlice.actions;

export default skillsSlice.reducer;

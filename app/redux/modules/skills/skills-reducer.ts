import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { skillsApi_fetchAllSkills } from "./skills-api";
import { SkillsState } from "./skills-types";
// import { showMessage } from "react-native-flash-message";
import { ErrorCodesMap } from "../../../config/error-constants";
import { SkillModel } from "../../../models/skills-response";

export const fetchAllSkills = createAsyncThunk("skills/fetchAllSkills", async (_: any, thunkAPI: any) => {
  try {
    const skillsResult = await skillsApi_fetchAllSkills();
    if (skillsResult.status === "ok") {
      thunkAPI.dispatch(setAllSkills(skillsResult.data));
    }
  } catch (err) { }
});

const initialState: SkillsState = {
  allSkills: []
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setAllSkills(state, { payload }: PayloadAction<Array<SkillModel>>): void {
      state.allSkills = payload;
    }
  },
  extraReducers: (builder: any) => {

  },
});

export const {
  setAllSkills
} = skillsSlice.actions;

export default skillsSlice.reducer;

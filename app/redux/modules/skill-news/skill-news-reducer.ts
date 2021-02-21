import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  skillNewsApi_fetchAllSkillNews
} from "./skill-news-api";
import { SkillNewsState } from "./skill-news-types";
import { SkillNewsModel } from "../../../models/skill-news-model";

export const fetchAllSkillNews = createAsyncThunk(
  "skillNews/fetchAllSkillNews",
  async (_: any, thunkAPI: any) => {
    try {
      const skillNewsResult = await skillNewsApi_fetchAllSkillNews();
      if (skillNewsResult.status === "ok") {
        thunkAPI.dispatch(setAllSkillNews(skillNewsResult.data));
      }
    } catch (err) {}
  }
);

const initialState: SkillNewsState = {
  skillNews: []
};

export const skillNewsSlice = createSlice({
  name: "skillNews",
  initialState,
  reducers: {
    setAllSkillNews(state, { payload }: PayloadAction<Array<SkillNewsModel>>): void {
      state.skillNews = payload;
    },
  }
});

export const {
  setAllSkillNews
} = skillNewsSlice.actions;

export default skillNewsSlice.reducer;

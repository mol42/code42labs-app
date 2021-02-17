import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState } from "./global-types";
import { globalApi_updateTheme, globalApi_updateLanguage } from "./global-api";
import { initTheme, whiteTheme, darkTheme } from "../../../config/theming";
import LocalStorage from "../../../config/storage";
import { ReduxActions } from "../redux-constants";
import { initI18n } from "../../../config/i18n";

export const updateProfileTheme = createAsyncThunk(
  "global/updateProfileTheme",
  async (theme :number, thunkAPI: any) => {
    try {
      const updatedProfileResult = await globalApi_updateTheme(theme);
      thunkAPI.dispatch(setTheme(theme));
      LocalStorage.save({
        key: "userData",
        data: updatedProfileResult.data
      });
      thunkAPI.dispatch(ReduxActions.auth.setUser(updatedProfileResult.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateProfileLanguage = createAsyncThunk(
  "global/updateProfileLanguage",
  async (language :number, thunkAPI: any) => {
    try {
      const updatedProfileResult = await globalApi_updateLanguage(language);
      initI18n(language);
      thunkAPI.dispatch(setLanguage(language));
      LocalStorage.save({
        key: "userData",
        data: updatedProfileResult.data
      });
      thunkAPI.dispatch(ReduxActions.auth.setUser(updatedProfileResult.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const initGlobalTheme = createAsyncThunk(
  "global/initGlobalTheme",
  async (userTheme :number, thunkAPI: any) => {
    try {
      const selectedTheme = userTheme === 0 ? whiteTheme : darkTheme;
      initTheme(selectedTheme);
      thunkAPI.dispatch(setTheme(userTheme));
    } catch (err) {
      console.log(err);
    }
  }
);

export const initGlobalLanguage = createAsyncThunk(
  "global/initGlobalLanguage",
  async (language :number, thunkAPI: any) => {
    try {
      initI18n(language);
      thunkAPI.dispatch(setLanguage(language));
    } catch (err) {
      console.log(err);
    }
  }
);

const LANG_EN = 0;
const LANG_TR = 1;

const THEME_NORMAL = 0;
const THEME_DARK = 1;

const initialState: GlobalState = {
  theme: THEME_NORMAL,
  language: LANG_EN,
  isInited: false
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<number>) {
      state.theme = payload;
    },
    setLanguage(state, { payload }: PayloadAction<number>) {
      state.language = payload;
    },
    setIsInited(state, { payload }: PayloadAction<boolean>) {
      state.isInited = payload;
    },
  }
});

export const {
  setTheme,
  setLanguage,
  setIsInited
} = globalSlice.actions;

ReduxActions.global = {
  setTheme,
  setIsInited,
  updateProfileTheme,
  initGlobalTheme,
  initGlobalLanguage
};

export default globalSlice.reducer;

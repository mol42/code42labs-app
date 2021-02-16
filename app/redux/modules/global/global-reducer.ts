import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState } from "./global-types";
import { globalApi_updateTheme } from "./global-api";
import { initTheme, whiteTheme, darkTheme } from "../../../config/theming";
import LocalStorage from "../../../config/storage";
import { setUser } from "../auth/auth-reducer";

export const updateProfileTheme = createAsyncThunk(
  "global/updateProfileTheme",
  async (theme :string, thunkAPI: any) => {
    try {
      const updatedProfileResult = await globalApi_updateTheme(theme);
      thunkAPI.dispatch(setTheme(theme));
      LocalStorage.save({
        key: "userData",
        data: updatedProfileResult.data
      });
      thunkAPI.dispatch(setUser(updatedProfileResult.data));
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
      thunkAPI.dispatch(setTheme(userTheme === 0 ? "normal" : "dark"));
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: GlobalState = {
  theme: "white",
  isInited: false
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<string>) {
      state.theme = payload;
    },
    setIsInited(state, { payload }: PayloadAction<boolean>) {
      state.isInited = payload;
    },
  }
});

export const {
  setTheme,
  setIsInited
} = globalSlice.actions;

export default globalSlice.reducer;

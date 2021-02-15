import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "./global-types";

const initialState: GlobalState = {
  firstName: "tayfun",
  theme: "white"
};

export const globalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<string>) {
      state.theme = payload;
    },
  }
});

export const {
  setTheme
} = globalSlice.actions;

export default globalSlice.reducer;

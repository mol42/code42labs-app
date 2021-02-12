import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./modules/auth/auth-reducer";
import globalReducer from "./modules/global/global-reducer";
import skillsReducer from "./modules/skills/skills-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  skills: skillsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./modules/auth/auth-reducer";
import globalReducer from "./modules/global/global-reducer";
import skillsReducer from "./modules/skills/skills-reducer";
import skillNewsReducer from "./modules/skill-news/skill-news-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  skills: skillsReducer,
  skillNews: skillNewsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

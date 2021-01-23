import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import authReducer from './modules/auth/auth-reducer';
import globalReducer from './modules/global/global-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
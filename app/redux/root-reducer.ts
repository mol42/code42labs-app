import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import authReducer from './modules/auth/auth-reducer';

const rootReducer = combineReducers({
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
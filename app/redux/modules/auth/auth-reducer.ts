import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import nanoid from 'nanoid'
import { RootState } from '../../root-reducer';

export type UserCredentials = {
  email: string
  password: string
}

export type User = {
  firstName: string
  lastName: string
  initials: string
}

export type NewUser = User & UserCredentials

export type AuthError = {
  code: string
  message: string
  id: string
}

export type AuthState = {
  firstName : string,
  loading: 'idle' | 'pending'
  currentRequestId: undefined
  error: AuthError | undefined
}

/**
 * NewUser sign up
 * @type {((arg: ({firstName: string; lastName: string} & UserCredentials)) => (dispatch: GetDispatch<{}>, getState: () => GetState<{}>, extra: GetExtra<{}>) => (Promise<PayloadAction<RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}, never> | PayloadAction<GetRejectValue<{}> | undefined, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}, SerializedError>> & {abort: (reason?: (string | undefined)) => void})) & {pending: ActionCreatorWithPreparedPayload<[string, ({firstName: string; lastName: string} & UserCredentials)], undefined, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>; rejected: ActionCreatorWithPreparedPayload<[(Error | null), string, ({firstName: string; lastName: string} & UserCredentials), (GetRejectValue<{}> | undefined)], GetRejectValue<{}> | undefined, string, SerializedError, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}>; fulfilled: ActionCreatorWithPreparedPayload<[RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, ({firstName: string; lastName: string} & UserCredentials)], RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>}}
 */
export const signUp = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/signUp',
  async (newUser, thunkAPI) => {
    // TO BE FILLED
  }
)

const initialState: AuthState = {
  firstName : "tayfun",
  loading: 'idle',
  currentRequestId: undefined,
  error: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = 'idle'
      state.error = undefined
    })
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = 'idle'
      state.error = payload
    })
  },
})

// Auth selector
// export const selectAuth = (state: RootState) => state.firebase.auth
// export const selectProfile = (state: RootState) => state.firebase.profile

export default authSlice.reducer
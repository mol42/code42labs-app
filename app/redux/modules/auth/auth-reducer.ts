import { createAsyncThunk, createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
// import { RootState } from '../../root-reducer';
import { navigate } from "../../../navigation/navigation";

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
  firstName: string
}

/**
 * NewUser sign up
 * @type {((arg: ({firstName: string; lastName: string} & UserCredentials)) => (dispatch: GetDispatch<{}>, getState: () => GetState<{}>, extra: GetExtra<{}>) => (Promise<PayloadAction<RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}, never> | PayloadAction<GetRejectValue<{}> | undefined, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}, SerializedError>> & {abort: (reason?: (string | undefined)) => void})) & {pending: ActionCreatorWithPreparedPayload<[string, ({firstName: string; lastName: string} & UserCredentials)], undefined, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>; rejected: ActionCreatorWithPreparedPayload<[(Error | null), string, ({firstName: string; lastName: string} & UserCredentials), (GetRejectValue<{}> | undefined)], GetRejectValue<{}> | undefined, string, SerializedError, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}>; fulfilled: ActionCreatorWithPreparedPayload<[RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, ({firstName: string; lastName: string} & UserCredentials)], RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>}}
 */
export const testThunk = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/testThunk',
  async (newUser: NewUser, thunkAPI: any) => {
    // TO BE FILLED
    console.log(newUser);
    console.log(thunkAPI);

    navigate("LoginScreen", null);
  }
)

const initialState: AuthState = {
  firstName: "tayfun"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    testAction(state, { payload }: PayloadAction<any>) {
      console.log("auth reducer testAction")
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(testThunk.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
      console.log("testThunk.fulfilled");
     })
  },
})

export const {
  testAction
} = authSlice.actions

export default authSlice.reducer
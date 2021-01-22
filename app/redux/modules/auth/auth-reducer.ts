import { createAsyncThunk, createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
// import { RootState } from '../../root-reducer';
// import { navigate } from "../../../navigation/navigation";
import { authApi_login } from "./auth-api";
import { UserCredentials, AuthError, AuthState } from "./auth-types";
import { UserModel } from "../../../models/auth-response";

export const doLogin = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/doLogin',
  async (loginUser: UserCredentials, thunkAPI: any) => {
    const loginResult = await authApi_login(loginUser);
    console.log(JSON.stringify(loginResult));
    thunkAPI.dispatch(setUser(loginResult.data.user));
  }
)

const initialState: AuthState = {
  email: "",
  password: "",
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeEmail(state, { payload }: PayloadAction<string>) {
      state.email = payload;
    },
    changePassword(state, { payload }: PayloadAction<string>) {
      state.password = payload;
    },
    setUser(state, { payload }: PayloadAction<UserModel>) {
      state.user = payload;
    },
    doLogout(state, { payload }: PayloadAction<null>) {
      state.user = null;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(doLogin.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
      console.log("doLogin.fulfilled");
    })
  },
})

export const {
  changeEmail,
  changePassword,
  setUser,
  doLogout
} = authSlice.actions

export default authSlice.reducer
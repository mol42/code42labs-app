import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi_login, authApi_signup } from "./auth-api";
import { UserCredentials, AuthError, AuthState, NewUser } from "./auth-types";
import { UserModel } from "../../../models/auth-response";

export const doLogin = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/doLogin',
  async (loginUser: UserCredentials, thunkAPI: any) => {
    const loginResult = await authApi_login(loginUser);
    console.log(JSON.stringify(loginResult));
    thunkAPI.dispatch(setUser(loginResult.data.user));
  }
)

export const doSignup = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/doSignup',
  async (newUser: NewUser, thunkAPI: any) => {
    const signupResult = await authApi_signup(newUser);
    console.log(JSON.stringify(signupResult));
    thunkAPI.dispatch(setUser(signupResult.data.user));
  }
)

const initialState: AuthState = {
  firstName: "",
  lastName: "",
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
    changeFirstName(state, { payload }: PayloadAction<string>) {
      state.firstName = payload;
    },
    changeLastName(state, { payload }: PayloadAction<string>) {
      state.lastName = payload;
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
  changeFirstName,
  changeLastName,
  changeEmail,
  changePassword,
  setUser,
  doLogout
} = authSlice.actions

export default authSlice.reducer
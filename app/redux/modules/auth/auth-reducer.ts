import { createAsyncThunk, createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
// import { RootState } from '../../root-reducer';
// import { navigate } from "../../../navigation/navigation";
import { doPost } from "../../../services/custom-http-service";
import { ApiResponse, AuthResponseData } from "../../../models/auth-response";

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
  email: string,
  password: string
}

export const doLogin = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/doLogin',
  async (loginUser: UserCredentials, thunkAPI: any) => {
    const loginResult: ApiResponse<AuthResponseData> | unknown = await doPost("http://localhost:3000/auth/login", loginUser);
    console.log(JSON.stringify(loginResult));
  }
)

const initialState: AuthState = {
  email: "",
  password: ""
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
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(doLogin.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
      console.log("doLogin.fulfilled");
    })
  },
})

export const {
  changeEmail,
  changePassword
} = authSlice.actions

export default authSlice.reducer
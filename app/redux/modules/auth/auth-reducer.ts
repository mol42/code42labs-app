import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "./auth-types";
import { UserModel } from "../../../models/user-model";
import { authApi_login, authApi_signup } from "./auth-api";
import { UserCredentials, AuthError, NewUser } from "./auth-types";
import { showMessage } from "react-native-flash-message";
import { ErrorCodesMap } from "../../../config/error-constants";
import { GlobalConstants } from "../../../config/global-constants";
import LocalStorage from "../../../config/storage";
import { ReduxActions } from "../redux-constants";

export const initAuth = createAsyncThunk<
  any,
  any,
  { rejectValue: AuthError }
>("auth/initApp", async (_ :any, thunkAPI: any) => {
  try {
    const userData = await LocalStorage.load({
      key: "userData"
    });
    const xAuthToken = await LocalStorage.load({
      key: "xAuthToken"
    });
    if (userData && xAuthToken) {
      thunkAPI.dispatch(setUser(userData));
      thunkAPI.dispatch(setAuthToken(xAuthToken));
      //
      thunkAPI.dispatch(ReduxActions.global.initGlobalLanguage(userData.language));
      thunkAPI.dispatch(ReduxActions.global.initGlobalTheme(userData.theme));
    } else {
      thunkAPI.dispatch(ReduxActions.global.initGlobalLanguage(0));
      thunkAPI.dispatch(ReduxActions.global.initGlobalTheme(0));
    }
  } catch (err) {
    thunkAPI.dispatch(ReduxActions.global.initGlobalLanguage(0));
    thunkAPI.dispatch(ReduxActions.global.initGlobalTheme(0));
  } finally {
    thunkAPI.dispatch(ReduxActions.global.setIsInited(true));
  }
});

export const doLogin = createAsyncThunk<
  any,
  UserCredentials,
  { rejectValue: AuthError }
>("auth/doLogin", async (loginUser: UserCredentials, thunkAPI: any) => {
  const { email, password } = loginUser;
  if (!email || !password) {
    showMessage({
      message: "Some fields are missing, please fill all fields and try again",
      type: "danger",
      autoHide: true,
    });
    return;
  }
  try {
    const loginResult = await authApi_login(loginUser);
    if (loginResult.status === "ok") {
      LocalStorage.save({
        key: "userData",
        data: loginResult.data.user
      });
      LocalStorage.save({
        key: "xAuthToken",
        data: loginResult.data.xAuthToken
      });
      thunkAPI.dispatch(setUser(loginResult.data.user));
      thunkAPI.dispatch(setAuthToken(loginResult.data.xAuthToken));
      //
      thunkAPI.dispatch(ReduxActions.global.initGlobalTheme(loginResult.data.user.theme));
      thunkAPI.dispatch(ReduxActions.global.initGlobalLanguage(loginResult.data.user.language));
    } else {
      // typescipt bir constnt icindeki keyleri kontrol ettigi icin ve
      // dinamik olarak bir keyi kabul etmedigi icin varsayilan olarak
      // buradaki type tanimlayarak atama adimi sayesinde tip tanimlamis
      // oluyoruz ve boylece ErrorCodesMap[errorCode] diyebiliyoruz
      // hata verdirmeden.
      const errorCode: keyof typeof ErrorCodesMap = loginResult.data;
      showMessage({
        message: ErrorCodesMap[errorCode],
        type: "danger",
        autoHide: true,
      });
    }
  } catch (err) { }
});

export const doSignup = createAsyncThunk<
  any,
  NewUser,
  { rejectValue: AuthError }
>("auth/doSignup", async (newUser: NewUser, thunkAPI: any): Promise<void> => {
  thunkAPI.dispatch(clearSignupError(null));
  const { firstName, lastName, email, password } = newUser;
  if (!firstName || !lastName || !email || !password) {
    showMessage({
      message: "Some fields are missing, please fill all fields and try again",
      type: "danger",
      autoHide: true,
    });
    return;
  }
  try {
    const signupResult = await authApi_signup(newUser);
    if (signupResult.status === "ok") {
      thunkAPI.dispatch(setSignupSuccess(signupResult.data.user));
    } else {
      // typescipt bir constnt icindeki keyleri kontrol ettigi icin ve
      // dinamik olarak bir keyi kabul etmedigi icin varsayilan olarak
      // buradaki type tanimlayarak atama adimi sayesinde tip tanimlamis
      // oluyoruz ve boylece ErrorCodesMap[errorCode] diyebiliyoruz
      // hata verdirmeden.
      const errorCode: keyof typeof ErrorCodesMap = signupResult.data;
      showMessage({
        message: ErrorCodesMap[errorCode],
        type: "danger",
        autoHide: true,
      });
    }
  } catch (err) { }
});

export const doLogout = createAsyncThunk<
  any,
  null,
  { rejectValue: AuthError }
>("auth/doLogout", async (_:any, thunkAPI: any) => {
  try {
    LocalStorage.remove({
      key: "userData"
    });
    LocalStorage.remove({
      key: "xAuthToken"
    });
    thunkAPI.dispatch(clearUser(null));
  } catch (err) { }
});

const initialState: AuthState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  signupHasError: false,
  signupErrorMessage: undefined,
  signupSuccess: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSignupError(state, { payload }: PayloadAction<null>) {
      state.signupHasError = false;
      state.signupErrorMessage = undefined;
    },
    setSignupError(state, { payload }: PayloadAction<string>) {
      state.signupHasError = true;
      state.signupErrorMessage = payload;
    },
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
    setSignupSuccess(state, { payload }: PayloadAction<UserModel>) {
      state.user = payload;
      state.signupSuccess = true;
    },
    setAuthToken(state, { payload }: PayloadAction<string>) {
      GlobalConstants.authToken = payload;
    },
    setUser(state, { payload }: PayloadAction<UserModel>) {
      state.user = payload;
    },
    clearUser(state, { payload }: PayloadAction<null>) {
      state.user = null;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      doLogin.fulfilled,
      (state: AuthState, action: PayloadAction<string>) => {
        console.log("doLogin.fulfilled");
      },
    );
  },
});

export const {
  changeFirstName,
  changeLastName,
  changeEmail,
  changePassword,
  setSignupError,
  clearSignupError,
  setUser,
  setSignupSuccess,
  setAuthToken,
  clearUser
} = authSlice.actions;

// import cycle problemi icin. Detayli
// aciklama redux-constants.ts icinde
ReduxActions.auth = {
  changeFirstName,
  changeLastName,
  changeEmail,
  changePassword,
  setSignupError,
  clearSignupError,
  setUser,
  setSignupSuccess,
  setAuthToken,
  clearUser
};

export default authSlice.reducer;

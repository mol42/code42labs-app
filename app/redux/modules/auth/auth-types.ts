import { UserModel } from "../../../models/auth-model";

export type UserCredentials = {
  email: string
  password: string
}

export type User = {
  firstName: string
  lastName: string
}

export type NewUser = User & UserCredentials

export type AuthError = {
  code: string
  message: string
  id: string
}

export type AuthState = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  signupHasError: boolean,
  signupErrorMessage: string | undefined,
  signupSuccess: boolean,
  user: UserModel | null
}

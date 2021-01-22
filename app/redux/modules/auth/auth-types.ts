import { UserModel } from "../../../models/auth-response";

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
  password: string,
  user: UserModel | null
}
import { hrRequest } from '../hrRequest'

export const baseGetMe = (token: string) => {
  return hrRequest(token).get("/users/me")
}
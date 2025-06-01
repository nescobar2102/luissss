import { getCookie } from "cookies-next"

export function getAuthorizationHeader() {
  const token = getCookie("currentUser")

  return {
    Authorization: `Bearer ${token}`
  }
}
export function getAuthorizationHeaderReset() {
  const token = getCookie("currentUserReset")
  return {
    Authorization: `Bearer ${token}`
  }
}

export function getAuthorizationHeadertoken() {
  const token = getCookie("currentUser")
  return {
    Authorization: `${token}`
  }
}

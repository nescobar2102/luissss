import { deleteCookie,getCookie } from "cookies-next"
import { getAuthorizationHeader } from "@utils/getAuthorizationHeader"
import { getAuthorizationHeaderReset } from "../utils/getAuthorizationHeader"
 

export class AuthService {
  static login(userData: { username: string; password: string }) {
    throw new Error('Method not implemented.')
  }
  sign_up = async (authData: any) => {
    try {
      const signupResponse = await fetch("/api/auth/sign_up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData)
      })

      if (signupResponse.status === 201 || signupResponse.status === 200) {
        return signupResponse.json()
      } else {
        return { error: "Error in signup" }
      }
    } catch (error) {
      return error
    }
  }

  login = async (loginData: any) => {
    try {
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      })

      if (loginResponse.status === 200 || loginResponse.status === 401) {
        return loginResponse.json()
      } else {
        return { error: "Error in login" }
      }
    } catch (error) {
      return error
    }
  }

  validate = async (token: any) => {
    try {
      const activateResponse = await fetch(`/api/auth/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthorizationHeaderReset() },
        body: JSON.stringify(token)
      })

      if (activateResponse.status === 200) {
        return activateResponse.json()
      } else {
        return { error: "Error in activate account" }
      }
    } catch (error) {
      return error
    }
  }

  resencodevalidate = async (lang: any) => {
    try {
      const activateResponse = await fetch(`/api/auth/sendcodevalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthorizationHeaderReset() },
        body: JSON.stringify(lang)
      })

      if (activateResponse.status === 200) {
        return activateResponse.json()
      } else {
        return { error: "Error in code account" }
      }
    } catch (error) {
      return error
    }
  }

  logout = async () => {
    try {
      deleteCookie("currentUserReset")
      deleteCookie("currentUser")
      deleteCookie("email")
      return true
    } catch (error) {
      return error
    }
  }

  reset = async (resetData: any) => {
    try {
      const resetResponse = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData)
      })

      if (resetResponse.status === 200) {
        return resetResponse.json()
      } else {
        return { error: "Error in reset password" }
      }
    } catch (error) {
      return error
    }
  }

  new_password = async (password: any) => {
    try {
  
      const authorizationHeader = getCookie("currentUserReset") ? getAuthorizationHeaderReset() : getAuthorizationHeader();
 
      const passwordResponse = await fetch("/api/auth/new_password", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authorizationHeader },
        body: JSON.stringify(password)
      });
  
      if (passwordResponse.status === 200) {
        return passwordResponse.json();
      } else {
        return { error: "Error in new password" };
      }
    } catch (error) {
      return error;
    }
  };
}

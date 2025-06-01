import crypto from "crypto" 
import { emailServiceNew } from "@services"
class VerificationCode {
  generateVerificationCode() {
    const code = crypto.randomInt(1000, 9999).toString()
    return code
  }

  sendEmailCode(email_pers: any, code: any, name: any, lang: string, token:string ) {
    const send = {
      userEmail: email_pers,
      type: "resetAccount",
      verificationCode: code,
      userFirstname: name,
      lang: lang,
      token: token
    }
    emailServiceNew.sendEmail(send)
  }
}

export default VerificationCode

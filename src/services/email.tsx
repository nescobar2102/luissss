import nodemailer from "nodemailer"
import { render } from "@react-email/render"

import * as React from "react" 
import { ActivateAccount2Template } from "@templates/activateAccount2"
import { ChangeAccountTemplate } from "@templates/changeAccount"
import { EmailData } from "@types"
 

export class EmailService {
  sendEmail = async (_emailData: EmailData) => {
 
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_ADDRESS!,
        pass: process.env.EMAIL_PASSWORD!
      }
    })

    transporter.verify()

    let emailHtml
    let subject: string
    let logo
    const baseUrl = process.env.BASE_URL ? `${process.env.BASE_URL}` : ""
    switch (_emailData.type) {
      
      case "resetAccount": 
        emailHtml = render(<ChangeAccountTemplate userFirstname={_emailData.userFirstname}  lang={_emailData.lang} verificationCode={_emailData.verificationCode} />)
        subject = "Validación de seguridad travacación"
        logo = [
          {
            filename: "travacacion_logo_curvas.png",
            path: `${baseUrl}/images/travacacion_logo_curvas.png`,
            cid: "logo"
          },
          {
            filename: "travacacion-confirmacion.png",
            path: `${baseUrl}/images/travacacion-confirmacion.png`,
            cid: "logo_email"
          }
        ]
        break

      case "activateAccount2": 

        emailHtml = render(<ActivateAccount2Template userFirstname={_emailData.userFirstname}  lang={_emailData.lang} />, {
          plainText: false
        })
        logo = [
          {
            filename: "travacacion_logo_curvas.png",
            path: `${baseUrl}/images/travacacion_logo_curvas.png`,
            cid: "logo"
          },
          {
            filename: "travacacion-verificacion.png",
            path: `${baseUrl}/images/travacacion-verificacion.png`,
            cid: "logo_email"
          }
        ]

        subject = "Bienvenido a Travacación"
        break

      default:
        subject = ""
        break
    }

    const options = {
      from: process.env.EMAIL_ADDRESS,
      to: _emailData.userEmail,
      subject: subject,
      html: emailHtml,
      attachments: logo
    }
    try {
      const info = await transporter.sendMail(options)
    } catch (error) {
      console.error(`Error sending activation email to ${_emailData.userEmail}: ${error}`)
    }
  }
}
export const emailService = new EmailService()

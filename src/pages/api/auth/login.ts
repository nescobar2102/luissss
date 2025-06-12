import type { NextApiRequest, NextApiResponse } from "next"

import { IResult } from "@types"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import db from "@utils/dbSql"

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResult>) {
  const result: IResult = { error: true }
  try {
    console.log("LLega")
    let status = 200
    if (req.method === "POST") {
      const { email, password } = req.body
      let resultId
      let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
      if (validEmail.test(email)) {
        resultId = await db.getQuery(`SELECT ID , STATUS, username, NOMBRE FROM t_users WHERE username = '${email}'`)
      } else {
        resultId = await db.getQuery(`SELECT ID_SOCIA, STATUS, EMAIL_PERS, NOMBRE  FROM TRVA.SOCIA WHERE NO_SOCIA_RSVP='${email}'`)
      }

      if (!resultId || !resultId.recordset || resultId.recordset.length === 0) {
        result.msg = `Socio ${email} no existe`
        result.data = { email: true }
        status = 401
      } else {
        const IdSocia = resultId.recordset[0].ID_SOCIA
        const statusSocio = resultId.recordset[0].STATUS
        const emailSocio = resultId.recordset[0].EMAIL_PERS
        const nombre = resultId.recordset[0].NOMBRE

        const resultPass = await db.getQuery(`SELECT  PASSWORD FROM TRVA.SOCIA_LOGIN WHERE ID_SOCIA= '${IdSocia}'`)

        const userPassword = resultPass.recordset[0].PASSWORD.trim()

        const isMatch = await bcrypt.compare(password, userPassword)
        if (!isMatch) {
          result.msg = "Password incorrect"
          result.data = { password: true }
          status = 401
        } else {
          if (statusSocio === "I" || statusSocio === "F") {
            result.msg = "usuario bloqueado"
            result.data = { fatal: true }
            status = 401
          } else {
                const current_time = Math.floor(Date.now() / 1000);
                        const expiration_time = current_time + 864000; // ten days
                        const private_key = 'private_key';
                        const claims = {
                           "emailSocio": emailSocio,
                            "idSocia": IdSocia ,
                            'sub': 'public_key',
                            'exp': expiration_time
                        };
            
                    const token = jwt.sign(claims, private_key, { algorithm: 'HS256' });
                    console.log(token);  
          
            if (statusSocio === "P") {
              result.msg = "usuario pendiente de validacion"
              result.data = { verify: true, token, emailSocio }
              status = 401
            } else {
              result.error = false
              result.msg = "Login successfully"  
              result.data = { token }
            }
          }
        }
      }
      return res.status(status).json(result)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(result)
  }
}

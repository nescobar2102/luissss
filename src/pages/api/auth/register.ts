// pages/api/auth/login.ts (assuming this is your API route file)
import type { NextApiRequest, NextApiResponse } from "next";
// import { emailService } from "../../../services/email"; // Comentado si no se usa directamente aquí
import { IResult } from "@types"; // Asegúrate de que esta ruta sea correcta
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import db from "@utils/dbSql"; // Asegúrate de que esta ruta sea correcta a tu db.ts (PostgreSQL class)

// Define una interfaz para los datos de registro que esperas de la base de datos
interface SociaRecord {
  ID_SOCIA: number;
  STATUS: string;
  EMAIL_PERS: string;
  NOMBRE: string;
}

interface SociaLoginRecord {
  PASSWORD: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResult>) {
  const result: IResult = { error: true }; // Inicializa el resultado con error por defecto
  let status = 500; // Por defecto, un error de servidor si algo sale mal

  try {
    if (req.method === "POST") {
      const { email, password, lang } = req.body;

      // 1. Validar la entrada (email y password)
      if (!email || !password) {
        result.msg = "Email y contraseña son requeridos.";
        result.data = { general: true };
        return res.status(400).json(result);
      }

      const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      let sociaResult;

      // 2. Consulta de usuario (¡Importante: usa consultas parametrizadas!)
      if (validEmailRegex.test(email)) {
        sociaResult = await db.getQuery<SociaRecord>(
          `SELECT ID_SOCIA, STATUS, EMAIL_PERS, NOMBRE FROM TRVA.SOCIA WHERE EMAIL_PERS = $1`,
          [email]
        );
      } else {
        // Asumiendo que 'NO_SOCIA_RSVP' es un identificador único como un número de socio
        sociaResult = await db.getQuery<SociaRecord>(
          `SELECT ID_SOCIA, STATUS, EMAIL_PERS, NOMBRE FROM TRVA.SOCIA WHERE NO_SOCIA_RSVP = $1`,
          [email]
        );
      }

      // 3. Verificar si el usuario existe
      if (!sociaResult || !sociaResult.rows || sociaResult.rows.length === 0) {
        result.msg = `Socio ${email} no existe`;
        result.data = { email: true };
        status = 401; // Unauthorized
      } else {
        const socia = sociaResult.rows[0];
        const { ID_SOCIA: idSocia, STATUS: statusSocio, EMAIL_PERS: emailSocio, NOMBRE: nombre } = socia;

        // 4. Obtener la contraseña hasheada (¡Importante: usa consultas parametrizadas!)
        const passwordResult = await db.getQuery<SociaLoginRecord>(
          `SELECT PASSWORD FROM TRVA.SOCIA_LOGIN WHERE ID_SOCIA = $1`,
          [idSocia]
        );

        if (!passwordResult || !passwordResult.rows || passwordResult.rows.length === 0) {
          result.msg = "Contraseña no encontrada para este usuario.";
          result.data = { password: true };
          status = 401;
          return res.status(status).json(result);
        }

        const userPasswordHashed = passwordResult.rows[0].PASSWORD.trim();

        // 5. Comparar la contraseña
        const isMatch = await bcrypt.compare(password, userPasswordHashed);
        if (!isMatch) {
          result.msg = "Contraseña incorrecta";
          result.data = { password: true };
          status = 401;
        } else {
          // 6. Verificar el estado del socio
          if (statusSocio === "I" || statusSocio === "F") {
            result.msg = "Usuario bloqueado";
            result.data = { fatal: true };
            status = 401;
          } else { 
           

            const current_time = Math.floor(Date.now() / 1000);
            const expiration_time = current_time + 864000; // ten days
            const private_key = 'private_key';
            const claims = {
               "emailSocio": emailSocio,
                "idSocia": idSocia ,
                'sub': 'public_key',
                'exp': expiration_time
            };

            const token = jwt.sign(claims, private_key, { algorithm: 'HS256' });
            console.log(token);  

            // 8. Responder según el estado del socio
            if (statusSocio === "P") { // 'P' para Pendiente de validación
              result.msg = "Usuario pendiente de validación";
              result.data = { verify: true, token, emailSocio };
              status = 401; // Aún no autorizado completamente hasta validar
            } else { // 'A' para Activo, o cualquier otro estado válido
              result.error = false;
              result.msg = "Login exitoso";
              result.data = { token };
              status = 200; // OK
            }
          }
        }
      }
      return res.status(status).json(result);
    } else {
      // Manejar métodos HTTP no permitidos
      result.msg = "Método no permitido";
      status = 405; // Method Not Allowed
      return res.status(status).json(result);
    }
  } catch (error) {
    console.error("Error en la API de login:", error);
    result.msg = "Ocurrió un error interno del servidor.";
    // result.data = { error: error.message }; // Opcional: enviar el mensaje de error para depuración
    return res.status(500).json(result);
  }
}
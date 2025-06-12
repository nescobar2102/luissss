// db.js
const { Pool } = require("pg")

class PostgreSQL {
  constructor() {
    // Configuración de la conexión a PostgreSQL
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false // útil en desarrollo; cambiar según entorno
      }
    })
  }

  async getQuery(queryText, params = []) {
    try {
      const result = await this.pool.query(queryText, params)
      return result
    } catch (err) {
      console.error("Error en getQuery:", err)
      throw err
    }
  }

  async executeStoredProcedure(procedureName, params = []) {
    try {
      // Construimos el llamado al procedimiento: CALL my_proc($1, $2, ...)
      const placeholders = params.map((_, i) => `$${i + 1}`).join(", ")
      const queryText = `CALL ${procedureName}(${placeholders})`

      const result = await this.pool.query(queryText, params)
      return result
    } catch (err) {
      console.error("Error en executeStoredProcedure:", err)
      throw err
    }
  }
}

const db = new PostgreSQL()
module.exports = db

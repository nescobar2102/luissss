const sql = require("mssql")

class SQLServer {
  constructor() {
    // Configuración de la conexión a SQL Server
    this.sqlConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      port: 1433,
      options: {
        encrypt: false, // para azure
        trustServerCertificate: true // para el modo desarrollo
      }
    }
  }

  async getQuery(query) {
    try {
      // Conexión a SQL Server
      let pool = await sql.connect(this.sqlConfig)

      // Ejecución de la consulta
      const result = await pool.request().query(`${query}`)
      // Cierre de la conexión
      await pool.close()
      return result
    } catch (err) {
      console.log(err)
    }
  }

  async executeStoredProcedure(procedureName, params) {
    try {
      await sql.connect(this.sqlConfig)

      const request = new sql.Request()

      if (params) {
        Object.keys(params).forEach((key) => {
          request.input(key, params[key])
        })
      }

      const result = await request.execute(procedureName)

      return result
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      sql.close()
    }
  }
}

const db = new SQLServer()
export default db

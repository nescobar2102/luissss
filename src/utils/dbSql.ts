// db.ts
import { Pool, QueryResult } from 'pg'; // Importamos Pool y QueryResult de 'pg'

// Interfaz para la configuración de la base de datos
interface DbConfig {
  user?: string;
  password?: string;
  host?: string; // En PostgreSQL, 'server' se llama 'host'
  database?: string;
  port?: number;
  // Puedes añadir más opciones si las necesitas, por ejemplo, ssl
  ssl?: boolean | { rejectUnauthorized: boolean };
}

class PostgreSQL {
  private pool: Pool; // Declaramos una propiedad privada para el pool de conexiones
  private dbConfig: DbConfig;

  constructor() {
    // Configuración de la conexión a PostgreSQL
    this.dbConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST, // Cambiado de DB_SERVER a DB_HOST
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT || '5432', 10), // Puerto por defecto para PostgreSQL
      // Ejemplo de configuración SSL si tu base de datos lo requiere (ej. en la nube)
      // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };

    // Creamos un pool de conexiones con la configuración
    this.pool = new Pool(this.dbConfig);

    // Opcional: Manejar errores del pool
    this.pool.on('error', (err: Error) => {
      console.error('Error inesperado en el pool de conexiones de PostgreSQL', err);
      // Aquí podrías decidir si intentas reconectar, loggear, etc.
    });
  }

  /**
   * Ejecuta una consulta SQL genérica.
   * @param query La cadena de consulta SQL.
   * @param values Opcional: Un array de valores para sanitizar la consulta (evita inyección SQL).
   * @returns Una promesa que resuelve con el resultado de la consulta.
   */
  public async getQuery<T>(query: string, values?: any[]): Promise<QueryResult<T> | undefined> {
    let client;
    try {
      client = await this.pool.connect(); // Obtiene un cliente del pool
      const result: QueryResult<T> = await client.query(query, values);
      return result;
    } catch (err) {
      console.error('Error al ejecutar la consulta PostgreSQL:', err);
      // Aquí podrías relanzar el error o manejarlo de otra forma
      throw err; // Es mejor relanzar el error para que el código que llama lo maneje
    } finally {
      if (client) {
        client.release(); // Libera el cliente de vuelta al pool
      }
    }
  }

  /**
   * NOTA: PostgreSQL no tiene un concepto directo de "Stored Procedures" como SQL Server/MSSQL.
   * En PostgreSQL, se usan "Functions" (Funciones).
   * Esta función está adaptada para llamar a una función de PostgreSQL.
   * @param functionName El nombre de la función de PostgreSQL a ejecutar.
   * @param params Un array de argumentos para la función.
   * @returns Una promesa que resuelve con el resultado de la función.
   */
  public async executePostgresFunction<T>(functionName: string, params: any[] = []): Promise<QueryResult<T> | undefined> {
    let client;
    try {
      client = await this.pool.connect();
      // Construimos la llamada a la función: SELECT function_name($1, $2, ...)
      const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
      const query = `SELECT * FROM ${functionName}(${placeholders})`;

      const result: QueryResult<T> = await client.query(query, params);
      return result;
    } catch (error) {
      console.error(`Error al ejecutar la función PostgreSQL "${functionName}":`, error);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  // Opcional: Método para cerrar el pool de conexiones cuando la aplicación se detiene
  public async endPool(): Promise<void> {
    await this.pool.end();
    console.log('Pool de conexiones a PostgreSQL cerrado.');
  }
}

// Exportamos una única instancia de la clase para usarla en toda la aplicación
const db = new PostgreSQL();
export default db;
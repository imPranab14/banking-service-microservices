import mssql from "mssql";
import logger from "./logger.js";

const sqlConfig = {
  user: "sa",
  password: "admin@123",
  database: process.env.DB_NAME || "master",
  server: "localhost",
  port: 1435, // SQL Server port
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, //
    trustServerCertificate: true, 
  },
};
async function connectMSSQL() {
  try {
    const pool = await mssql.connect(sqlConfig);
    logger.info(`MSSQL Connected !, ${pool?.connected}`);
    return pool;
  } catch (error) {
    console.log("Failed to connected mssql".error);
  }
}

export default connectMSSQL;

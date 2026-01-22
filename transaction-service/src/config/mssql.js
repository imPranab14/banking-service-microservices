import mssql from "mssql";
import logger from "./logger.js";

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ,
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
    logger.info(`MSSQL Connected [${sqlConfig.server}] [${process.env.DB_NAME}] ${pool?.connected} !`);
    return pool;
  } catch (error) {
    console.log("Failed to connected mssql".error);
  }
}

export default connectMSSQL;

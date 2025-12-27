import winston from "winston";
import dotenv from "dotenv"
dotenv.config();



const logger = winston.createLogger({
//When you set a level, Winston logs that level AND all levels ABOVE it (lower number)
  level: process.env.LOG_LEVEL??"debug",
  defaultMeta: { service: "api_gateway" },
  
  format: winston.format.combine(
    //Log colors vary based on the type
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    //Log Print Formate
    winston.format.printf(({ level, message, service, timestamp }) => {
      return `${timestamp} [${service}] [${level}]: ${message}`;
    })
  ),

  transports: [
    //log console enable
    new winston.transports.Console(),
    //save the log file 
    //new winston.transports.File({ filename: 'combined.log' })
  ],
});

export default logger;

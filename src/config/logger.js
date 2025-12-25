import winston from "winston";


const logger=winston.createLogger({
    level:process.env.LOG_LEVEL,
    defaultMeta: { service: 'user-service' },
   // transports:[new winston.transport.Console()]
})

export default logger
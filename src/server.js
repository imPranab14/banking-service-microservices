import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import logger from "./config/logger.js";
dotenv.config();

//Express server
const app = express();
const port = process.env.PORT || 3000;

// Core middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());




//Request logging
app.use((req, res, next) => {
  logger.debug(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//404 handler
app.use((req, res, next) => {
  logger.warn(`Resource not found ${req.method} ${req.url}`);
  res.status(404), json({ message: "resource not found" });
  next()
});

//Error handler
// app.use((error, req, res, next) => {
//   logger.error(`error `, error);
//   res.status(500), json({ message: "internal server error" });
// });

function startServer() {
  try {
    app.listen(port, () => {
      logger.info(`Server running on ${port}`);
    });
  } catch (error) {
    logger.error(`Failed to start the server`, error);
    process.exit(1);
  }
}

//start server function
startServer();

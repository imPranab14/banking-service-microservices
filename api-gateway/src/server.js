import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import logger from "./config/logger.js";
import limiter from "./middleware/rate-limit.middleware.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import commonProxyServerFn from "./middleware/proxy.middleware.js";
//import apiProxy from "./config/services.js";

//Express server
const app = express();
const port = process.env.PORT || 3000;

// Core middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

//Proxy Middleware
app.use(
  commonProxyServerFn(
    "Auth Service",
    process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    "^/api/users"
  )
);
app.use(
  commonProxyServerFn(
    "Accounts Service",
    process.env.ACCOUNTS_SERVICE_URL || "http://localhost:3001",
    "^/api/users"
  )
);
app.use(
  commonProxyServerFn(
    "Transaction Service",
    process.env.TRANSACTION_SERVICE_URL || "http://localhost:3001",
    "^/api/users"
  )
);


//Request logging
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});

//Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//404 handler
app.use((req, res, next) => {
  logger.warn(`Resource not found ${req.method} ${req.url}`);
  res.status(404).json({ message: "resource not found" });
});

//Error handler
app.use((error, req, res, next) => {
  logger.error(`error `, error);
  res.status(500).json({ message: "internal server error" });
});

function startServer() {
  try {
    app.listen(port, () => {
      logger.info(`API Gateway running on port ${port}`);
    });
  } catch (error) {
    logger.error(`Failed to start the gateway server`, error);
    process.exit(1);
  }
}

//start server function
startServer();

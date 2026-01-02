import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import logger from "./config/logger.js";
import limiter from "./middleware/rate-limit.middleware.js";
import commonProxyServerFn from "./middleware/proxy.middleware.js";
import verifyToken from "./middleware/verifyToken.middleware.js";
//import apiProxy from "./config/services.js";

//Express server
const app = express();
const port = process.env.PORT || 3000;

// Core middlewares
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(verifyToken)


//Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

//Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});



//Proxy Middleware
app.use('/api/v1/auth',
  commonProxyServerFn(
    "auth service",
    process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    "^/api/v1/auth"
  )
);

app.use('/api/v1/accounts',
  commonProxyServerFn(
    "Accounts Service",
    process.env.ACCOUNTS_SERVICE_URL || "http://localhost:3002",
    "^/api/v1/accounts"
  )
);
app.use(
  commonProxyServerFn('/api/v1/transaction',
    "Transaction Service",
    process.env.TRANSACTION_SERVICE_URL || "http://localhost:3003",
    "^/api/v1/transaction"
  )
);


// //404 handler
// app.use((req, res, next) => {
//   logger.warn(`Resource not found ${req.method} ${req.url}`);
//   res.status(404).json({ message: "resource not found" });
// });

// //Error handler
// app.use((error, req, res, next) => {
//   logger.error(`error `, error);
//   res.status(500).json({ message: "internal server error" });
// });

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

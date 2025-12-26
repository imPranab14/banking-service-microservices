import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import logger from "./config/logger.js";
import limiter from "./middleware/rate-limit.middleware.js"; 
import { createProxyMiddleware } from "http-proxy-middleware";
//import apiProxy from "./config/services.js";


//Express server
const app = express();
const port = process.env.PORT || 3000;




// Core middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter)


// app.use('/api',createProxyMiddleware({
//     target:'http://localhost:3001',
//     changeOrigin: true,
//    // pathFilter:'/api/v1/auth/**'
// }))

app.use(
  "/api/users",
  createProxyMiddleware({
     target:'http://localhost:3001',
    changeOrigin: true,
   // pathRewrite: { "^/api/users": "" },
  })
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
// app.use((req, res, next) => {
//   logger.warn(`Resource not found ${req.method} ${req.url}`);
//   res.status(404), json({ message: "resource not found" });
//   next()
// });

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

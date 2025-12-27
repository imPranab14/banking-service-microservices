import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "../config/logger.js";

function commonProxyServerFn(serviceName, target, pathRewriteURL) {
  logger.info(`Configured proxy for [${serviceName}] at ${pathRewriteURL}`);
  return createProxyMiddleware({
    target: target, //"http://localhost:3001",
    changeOrigin: true,
    // Time limit for client → API Gateway connection
    // If the client request takes more than 5 seconds, it will be closed
    timeout: 5000,
    // Time limit for API Gateway → Microservice response
    // If the backend service does not respond within 5 seconds, request fails
    proxyTimeout: 5000,
    pathRewrite: {
      [pathRewriteURL]: "",
    },
    onError(err, req, res) {
      console.error("Proxy error:", err.message);
      res.status(502).json({
        message: "Service unavailable",
      });
    },
  });
}

export default commonProxyServerFn;

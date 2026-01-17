import client from "prom-client";

// Collect default metrics every 5 seconds
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Histogram to track HTTP request durations
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms", // milliseconds
  labelNames: ["method", "route", "code"], // HTTP method, route and response code
  buckets: [50, 100, 200, 300, 400, 500, 750, 1000, 2000, 5000], // buckets for response time from 50ms to 5000ms
});
// Counter to track total number of HTTP requests
export function getMetrics() {
  return client.register.metrics();
}
// Function to reset all metrics
export function resetMetrics() {
  client.register.resetMetrics();
}
export default client;

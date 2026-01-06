function ApiError(statusCode = "400", message, error) {
  return {
    statusCode,
    message,
    error,
  };
}
export { ApiError };

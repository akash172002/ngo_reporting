let requestCount = 0;

export const metricsMiddleware = (req, res, next) => {
  requestCount++;

  res.on("finish", () => {
    console.log(
      JSON.stringify({
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        totalRequests: requestCount,
      })
    );
  });

  next();
};

const defaultOptions = {
    windowSize: 15 * 60 * 1000, 
    maxRequests: 5, 
  };
  
  const createRateLimitMiddleware = (options = {}) => {
    const { windowSize, maxRequests } = { ...defaultOptions, ...options };
    const map = new Map();
  
    const apiRateLimit = (req, res, next) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const currentTimestamp = Date.now();
      const requests = map.get(ip) || [];
      requests.push(currentTimestamp);
      map.set(ip, requests);
      map.set(
        ip,
        requests.filter((timestamp) => timestamp > currentTimestamp - windowSize)
      );
      if (map.get(ip).length > maxRequests) {
        res.status(429).send("Too many requests from this IP, please try again later");
        return;
      }
      next();
    };
  
    return apiRateLimit;
  };
  
  module.exports = { createRateLimitMiddleware };
  
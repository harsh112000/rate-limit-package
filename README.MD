# Rate Limit Middleware for Express

This package provides a middleware function for rate limiting requests in Express applications.

## Installation

To use this middleware in your project, you can install it via npm:

```bash
npm install rateLimit-middleware

First, import the createRateLimitMiddleware function from the package:
const { createRateLimitMiddleware } = require('rate-limit');
## Usage

Once you've installed the package and imported the `createRateLimitMiddleware` function, you can use it to create rate limiting middleware for your Express routes.

### Configuration Options

The `createRateLimitMiddleware` function accepts an optional `options` object with the following properties:

- `windowSize`: The time window in milliseconds within which requests are counted for rate limiting. Defaults to 15 minutes (15 * 60 * 1000 ms).
- `maxRequests`: The maximum number of requests allowed within the specified time window. Defaults to 5 requests.

Here's how you can use the middleware with custom configuration:

```javascript
const express = require('express');
const { createRateLimitMiddleware } = require('rate-limit');

const app = express();


const options = {
  windowSize: 10 * 60 * 1000, 
  maxRequests: 5
};
const rateLimitMiddleware = createRateLimitMiddleware(options);

app.use(rateLimitMiddleware);






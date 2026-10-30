const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");
const app = express();

// Enable trust proxy
app.set("trust proxy", 1);

// 1. Proxy to Auth Service (Node.js on port 3001)
app.use(
    "/api/v1/auth",
    createProxyMiddleware({
        target: config.AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/api/v1/auth": ""
        }
    })
);

// 2. Proxy to Wanted Service (Python on port 3002)
app.use(
    "/api/v1/wanted",
    createProxyMiddleware({
        target: config.WANTED_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/api/v1/wanted": ""
        }
    })
);

// 3. Proxy to Main Service (Node.js on port 3000) with /api/v1 prefix
app.use(
    "/api/v1",
    createProxyMiddleware({
        target: config.SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/api/v1": ""
        }
    })
);

// 4. Fallback root proxy to Main Service
app.use(
    "/",
    createProxyMiddleware({
        target: config.SERVICE_URL,
        changeOrigin: true
    })
);

app.listen(config.GATEWAY_PORT, () => {
    console.log(`[SkyFlow Gateway] Unified Gateway active on http://localhost:${config.GATEWAY_PORT}/api/v1/`);
    console.log(`[SkyFlow Gateway] Routing to:`);
    console.log(`  - Main Service:   ${config.SERVICE_URL}`);
    console.log(`  - Auth Service:   ${config.AUTH_SERVICE_URL}`);
    console.log(`  - Wanted Service: ${config.WANTED_SERVICE_URL}`);
});

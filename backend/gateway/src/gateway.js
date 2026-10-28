const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");
const app = express();

// Proxy verso il wanted service (Python, porta 3002)
// L'utente naviga su /api/v1/wanted e la richiesta viene inoltrata a WANTED_SERVICE_URL
app.use("/api/v1/wanted", createProxyMiddleware({
  target: config.WANTED_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/wanted": ""
  }
}));

// Proxy verso il main service (Node.js, porta 3000)
// L'utente vede e digita /api/v1/... mentre il servizio riceve solo /...
app.use("/api/v1", createProxyMiddleware({
  target: config.SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1": ""
  }
}));

app.use("/", createProxyMiddleware({
  target: config.SERVICE_URL,
  changeOrigin: true
}));

app.listen(config.GATEWAY_PORT, () => {
  console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}/api/v1/`);
});

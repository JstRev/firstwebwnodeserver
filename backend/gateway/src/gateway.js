const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");

const app = express();

// Proxy verso il service
// l'utente vede e digita /api/v1/... mentre il servizio riceve solo /...
app.use("/api/v1", createProxyMiddleware({
  target: config.SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1": ""
  }
}));

app.listen(config.GATEWAY_PORT, () => {
  console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}`);
});
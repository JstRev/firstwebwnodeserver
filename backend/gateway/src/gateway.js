const express = require("express");
const config = require("../config/env");
const authProxy = require("../proxies/authProxy");
const wantedProxy = require("../proxies/wantedProxy");
const serviceProxy = require("../proxies/serviceProxy");

const app = express();

app.use("/api/v1/auth", authProxy);
app.use("/api/v1/wanted", wantedProxy);
app.use("/api/v1", serviceProxy);

app.listen(config.GATEWAY_PORT, () => {
  console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}/api/v1`);
});

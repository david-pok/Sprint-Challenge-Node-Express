const express = require("express");
const server = express();
const projectRoutes = require("./project/projectRoutes.js");
const actionRoutes = require("./action/actionRoutes.js");
const configMiddleware = require("./config/middleware");

configMiddleware(server);

server.use("/api/action", actionRoutes);
server.use("/api/project", projectRoutes);

server.get("/", (req, res) => {
  res.send("api running");
});

const port = 4000;
server.listen(port, () => console.log(`\n=API Running on port ${port}=\n`));

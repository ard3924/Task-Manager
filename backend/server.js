require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets");

const server = http.createServer(app);

initSocket(server);
connectDB();

server.listen(5000, () =>
  console.log("Server running on port 5000")
);

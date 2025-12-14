const { Server } = require("socket.io");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });

  io.on("connection", () => {
    console.log("Socket connected");
  });
};

exports.getIO = () => io;

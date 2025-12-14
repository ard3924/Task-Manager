const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/task.routes");

app.use("/api/tasks", taskRoutes);



app.get("/health", (_, res) => res.send("OK"));

module.exports = app;

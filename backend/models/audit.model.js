const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  oldValue: String,
  newValue: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);

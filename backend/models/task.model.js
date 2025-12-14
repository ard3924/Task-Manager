const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, maxlength: 100, required: true },
  description: String,
  dueDate: Date,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Low"
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Review", "Completed"],
    default: "To Do"
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedToId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

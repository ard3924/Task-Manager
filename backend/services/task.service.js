const taskRepo = require("../repositories/task.repository");
const auditService = require("./audit.service");
const { getIO } = require("../sockets");

exports.createTask = async (data, creatorId) => {
  return taskRepo.create({
    ...data,
    creatorId
  });
};

exports.getUserTasks = async (userId) => {
  return taskRepo.findAllForUser(userId);
};

exports.updateTask = async (taskId, updates, userId) => {
  const task = await taskRepo.findById(taskId);
  if (!task) throw new Error("Task not found");

  const io = getIO();

  // 🔍 Detect changes for audit
  if (updates.status && updates.status !== task.status) {
    await auditService.log({
      taskId,
      userId,
      action: "STATUS_UPDATED",
      oldValue: task.status,
      newValue: updates.status
    });
  }

  if (updates.priority && updates.priority !== task.priority) {
    await auditService.log({
      taskId,
      userId,
      action: "PRIORITY_UPDATED",
      oldValue: task.priority,
      newValue: updates.priority
    });
  }

  if (
    updates.assignedToId &&
    updates.assignedToId.toString() !== task.assignedToId?.toString()
  ) {
    await auditService.log({
      taskId,
      userId,
      action: "ASSIGNED",
      oldValue: task.assignedToId?.toString() || "none",
      newValue: updates.assignedToId
    });

    io.emit("task:assigned", {
      taskId,
      assignedToId: updates.assignedToId
    });
  }

  const updated = await taskRepo.updateById(taskId, updates);

  io.emit("task:updated", updated);

  return updated;
};

exports.deleteTask = async (taskId) => {
  return taskRepo.deleteById(taskId);
};

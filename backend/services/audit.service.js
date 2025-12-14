const AuditLog = require("../models/audit.model");

exports.log = async ({ taskId, userId, action, oldValue, newValue }) => {
  await AuditLog.create({
    taskId,
    userId,
    action,
    oldValue,
    newValue
  });
};

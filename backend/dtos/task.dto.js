const { z } = require("zod");

exports.createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string().optional(),
  dueDate: z.string(),
  priority: z.enum(["Low","Medium","High","Urgent"]),
  assignedToId: z.string()
});

exports.updateTaskDto = z.object({
  status: z.enum(["To Do","In Progress","Review","Completed"]).optional(),
  priority: z.enum(["Low","Medium","High","Urgent"]).optional(),
  assignedToId: z.string().optional()
});

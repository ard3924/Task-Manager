const taskService = require("../services/task.service");
const taskRepo = require("../repositories/task.repository");
const auditService = require("../services/audit.service");

jest.mock("../repositories/task.repository");
jest.mock("../services/audit.service");
jest.mock("../sockets", () => ({
  getIO: () => ({
    emit: jest.fn()
  })
}));

describe("Task Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("creates a task successfully", async () => {
    taskRepo.create.mockResolvedValue({ title: "Test Task" });

    const task = await taskService.createTask(
      { title: "Test Task" },
      "user123"
    );

    expect(taskRepo.create).toHaveBeenCalled();
    expect(task.title).toBe("Test Task");
  });

  test("logs audit when status is updated", async () => {
    taskRepo.findById.mockResolvedValue({
      _id: "task123",
      status: "To Do"
    });

    taskRepo.updateById.mockResolvedValue({
      status: "In Progress"
    });

    await taskService.updateTask(
      "task123",
      { status: "In Progress" },
      "user123"
    );

    expect(auditService.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "STATUS_UPDATED"
      })
    );
  });

  test("throws error when task not found", async () => {
    taskRepo.findById.mockResolvedValue(null);

    await expect(
      taskService.updateTask("invalid", {}, "user123")
    ).rejects.toThrow("Task not found");
  });
});

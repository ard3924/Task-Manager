const taskService = require("../services/task.service");
const {
  createTaskDto,
  updateTaskDto
} = require("../dtos/task.dto");

exports.createTask = async (req, res) => {
  try {
    const data = createTaskDto.parse(req.body);
    const task = await taskService.createTask(data, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updates = updateTaskDto.parse(req.body);
    const task = await taskService.updateTask(
      req.params.id,
      updates,
      req.user.id
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

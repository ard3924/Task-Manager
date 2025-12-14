import { api } from "./axios";

export const fetchTasks = () =>
  api.get("/tasks").then(res => res.data);

export const createTask = (data) =>
  api.post("/tasks", data).then(res => res.data);

export const updateTask = ({ id, updates }) =>
  api.put(`/tasks/${id}`, updates).then(res => res.data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

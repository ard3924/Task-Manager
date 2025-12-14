import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/task.api";

export default function Dashboard() {
  const {
    data: tasks,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load tasks</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-500">
                  Status: {task.status}
                </p>
                <p className="text-sm text-gray-500">
                  Priority: {task.priority}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { fetchTasks } from "./api/task.api";

export default function App() {
  // 🔐 Simple auth check:
  // If /tasks succeeds → user is logged in
  const {
    isLoading,
    isError
  } = useQuery({
    queryKey: ["auth-check"],
    queryFn: fetchTasks,
    retry: false
  });

  // While checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  // Not authenticated → show login
  if (isError) {
    return <Login />;
  }

  // Authenticated → show dashboard
  return <Dashboard />;
}

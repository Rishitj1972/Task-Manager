import React, { useEffect, useState } from "react";
import Task from "./Task";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle complete
  const toggleComplete = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to toggle task");

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit task
  const editTask = async (taskId, title, description) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onEdit={editTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
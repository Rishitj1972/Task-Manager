import React, { useEffect, useState } from "react";
import Task from "./Task";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTask, setFilterTask] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Add Task
  const addTask = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();

      // update UI instantly
      setTasks((prev) => [...prev, newTask]);

      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
      const response = await fetch(
        `http://localhost:8080/tasks/${taskId}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to toggle task");

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
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
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter Task

  const filteredTask = tasks.filter((task) => {
    if (filterTask == "completed") return task.completed;
    if (filterTask == "pending") return !task.completed;
    return true;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="space-y-2">
          <div className="mb-10 space-x-2">
            <button
              onClick={() => setFilterTask("all")}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              All
            </button>
            <button
              onClick={() => setFilterTask("completed")}
              className="px-3 py-1 bg-green-300 rounded"
            >
              Complete
            </button>
            <button
              onClick={() => setFilterTask("pending")}
              className="px-3 py-1 bg-yellow-300 rounded"
            >
              Pending
            </button>
          </div>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          {filteredTask.map((task) => (
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

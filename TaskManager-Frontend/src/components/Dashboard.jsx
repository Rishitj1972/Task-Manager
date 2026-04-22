import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import { addTaskApi, deleteTaskApi, fetchTaskApi, toggleCompleteApi, updateTaskApi } from "../api/TaskApi";
import Filter from "./Filter";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTask, setFilterTask] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Add Task
  const addTask = async () => {
    try {
      const newTask = await addTaskApi(title, description);
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const data = await fetchTaskApi();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);


  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await deleteTaskApi(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle complete
  const toggleComplete = async (taskId) => {
    try {
      const updatedTask = await toggleCompleteApi(taskId);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit task
  const editTask = async (taskId, title, description) => {
    try {
      const updatedTask = await updateTaskApi(taskId, title, description);
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

  // Log Out
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          LogOut
        </button>
      </div>

      {tasks.length === 0 ? (
  <p>No tasks found</p>
) : (
  <>
    <Filter setFilterTask={setFilterTask} />

    <AddTask
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      onAdd={addTask}
    />

    <TaskList
      tasks={filteredTask}
      onDelete={deleteTask}
      onToggleComplete={toggleComplete}
      onEdit={editTask}
    />
  </>
)}
    </div>
  );
};

export default Dashboard;

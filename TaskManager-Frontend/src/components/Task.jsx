import React, { useState } from "react";

const Task = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task.id, title, description);
    setIsEditing(false);
  };

  return (
    <div
      className={`border p-4 rounded shadow flex justify-between items-center ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      {isEditing ? (
        <form className="flex-1" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 rounded w-full mb-1"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 rounded w-full mb-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{task.title}</h2>
            <p>{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`px-2 py-1 rounded ${
                task.completed ? "bg-yellow-300" : "bg-green-500 text-white"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;

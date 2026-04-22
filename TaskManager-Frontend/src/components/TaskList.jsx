import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
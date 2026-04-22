import React from "react";

const Filter = ({ setFilterTask }) => {
  return (
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
  );
};

export default Filter;
import React, { useState } from "react";

const AddTaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({ title: "", description: "", status: "To Do" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Task Title"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="col-md-2">
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className="form-control"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;

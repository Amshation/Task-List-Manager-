import React, { useEffect, useState } from "react";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]); // All tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks
  const [searchText, setSearchText] = useState(""); // Search input value

  const [taskCounters, setTaskCounters] = useState({
    total: 0,
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  // Fetch initial data from the API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: "No description",
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(formattedData);
        setFilteredTasks(formattedData);
        updateTaskCounters(formattedData);
      });
  }, []);

  // Update task counters dynamically
  const updateTaskCounters = (taskList) => {
    const counters = taskList.reduce(
      (acc, task) => {
        acc.total += 1;
        if (task.status === "To Do") acc.toDo += 1;
        if (task.status === "In Progress") acc.inProgress += 1;
        if (task.status === "Done") acc.done += 1;
        return acc;
      },
      { total: 0, toDo: 0, inProgress: 0, done: 0 }
    );
    setTaskCounters(counters);
  };

  // Add Task
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    updateTaskCounters(updatedTasks);

    // Toast notification
    toast.success("Task added successfully!");
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    updateTaskCounters(updatedTasks);

    // Toast notification
    toast.success("Task deleted successfully!");
  };

  // Update Task
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    updateTaskCounters(updatedTasks);

    // Toast notification
    toast.success("Task updated successfully!");
  };

  // Handle Search Input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(value) ||
        task.description.toLowerCase().includes(value)
    );
    setFilteredTasks(filtered);
    updateTaskCounters(filtered);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task List Manager</h1>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks by Title or Description..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Task Counters */}
      <div className="d-flex justify-content-between mb-3">
        <span className="badge bg-primary">Total Tasks: {taskCounters.total}</span>
        <span className="badge bg-secondary">To Do: {taskCounters.toDo}</span>
        <span className="badge bg-warning text-dark">
          In Progress: {taskCounters.inProgress}
        </span>
        <span className="badge bg-success">Done: {taskCounters.done}</span>
      </div>

      {/* Add Task Form */}
      <AddTaskForm addTask={addTask} />

      {/* Task Table */}
      <TaskTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
};

export default App;

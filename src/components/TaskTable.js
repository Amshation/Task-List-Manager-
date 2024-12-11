import React, { useRef, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "tabulator-tables/dist/css/tabulator.min.css";

const TaskTable = ({ tasks, deleteTask, updateTask }) => {
  const tableRef = useRef();

  // Define table columns with editors
  const columns = [
    { title: "Task ID", field: "id", hozAlign: "center", width: 80, headerSort: false },
    { title: "Title", field: "title", editor: "input" }, // Inline editing for Title
    { title: "Description", field: "description", editor: "input" }, // Inline editing for Description
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] }, // Dropdown editor
    },
    {
      title: "Actions",
      formatter: (cell) => "<button class='btn btn-danger btn-sm'>Delete</button>",
      width: 100,
      hozAlign: "center",
      cellClick: (e, cell) => {
        const rowData = cell.getRow().getData();
        deleteTask(rowData.id); // Call the delete function passed as a prop
      },
    },
  ];

  // Handle cell edit events
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.table.on("cellEdited", (cell) => {
        const updatedTask = cell.getRow().getData();
        updateTask(updatedTask); // Update the task state in the parent component
      });
    }
  }, [updateTask]);

  return (
    <ReactTabulator
      ref={tableRef}
      data={tasks} // Pass tasks data
      columns={columns} // Configure columns
      layout={"fitColumns"} // Fit columns to the table width
      options={{ resizableColumns: false }}
    />
  );
};

export default TaskTable;

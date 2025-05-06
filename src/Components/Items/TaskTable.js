import React from "react";

const TaskTable = ({ tasks, viewTask, deleteTask }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-lg mb-4">
        <div className="card-header text-center">
          <h4>📝 Task List</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Assigned To</th>
                  <th>Created At</th>
                  <th>Due Date</th>
                  <th>Priority</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      {task.status === 0 ? (
                        <span className="badge bg-warning text-dark">Pending</span>
                      ) : task.status === 1 ? (
                        <span className="badge bg-info text-dark">In Progress</span>
                      ) : task.status === 2 ? (
                        <span className="badge bg-success">Completed</span>
                      ) : (
                        <span className="badge bg-secondary">Unknown</span>
                      )}
                    </td>
                    <td>{task.categoryName}</td>
                    <td>{task.assignedToUserName}</td>
                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td>
                      {task.priority === 0 ? (
                        <span className="badge bg-success ">Low</span>
                      ) : task.priority === 1 ? (
                        <span className="badge bg-warning text-dark">Medium</span>
                      ) : task.priority === 2 ? (
                        <span className="badge bg-danger">High</span>
                      ) : task.priority === 3 ? (
                        <span className="badge bg-dark">Critical</span>
                      ) : (
                        <span className="badge bg-secondary">Unknown</span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => viewTask(task)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;














/* import React from "react";

const TaskTable = ({ tasks, viewTask, deleteTask }) => {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header text-center">
        <h4>Task List</h4>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Category</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  {task.status === 0
                    ? "Pending"
                    : task.status === 1
                    ? "In Progress"
                    : task.status === 2
                    ? "Completed"
                    : "Unknown"}
                </td>
                <td>{task.categoryName}</td>
                <td>{task.assignedToUserName}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => viewTask(task)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
 */








/* import React from "react";

const TaskTable = ({ tasks, viewTask, deleteTask }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Category</th>
          <th>Assigned To</th>
          <th>Created At</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
            {task.status === 0
                ? "Pending"
                : task.status === 1
                ? "In Progress"
                : task.status === 2
                ? "Completed"
                : "Unknown"}
            </td>
            <td>{task.categoryName}</td>
            <td>{task.assignedToUserName}</td>
            <td>{task.createdAt}</td>
            <td>{task.dueDate}</td>
            <td>
              <button onClick={() => viewTask(task)}>View</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable; */

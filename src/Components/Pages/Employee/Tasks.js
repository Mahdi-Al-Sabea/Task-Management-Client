











 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async (id) => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Task/User/${id}`);
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const changeTaskStatus = async (taskId, status) => {
    try {
      await axios.put(`https://localhost:7132/api/Task/status/${taskId}`, {
        status: parseInt(status),
      });
      if (userId) fetchTasks(userId);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => String(task.status) === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((task) => task.categoryName === categoryFilter);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("tokenData");
    const data = JSON.parse(tokenData);
    if (data && data.user?.id) {
      setUserId(data.user.id);
      fetchTasks(data.user.id);
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, categoryFilter, searchTerm, tasks]);


  const categories = Array.from(new Set(tasks.map((task) => task.categoryName)));
  return (
    <div className="container mt-4">
      <h2 className="mb-4">🗂️ My Tasks</h2>
  
      {/* Filters Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Filter Tasks</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="🔍 Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
  
            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">📌 All Statuses</option>
                <option value="0">⏳ Pending</option>
                <option value="1">🚧 In Progress</option>
                <option value="2">✅ Completed</option>
              </select>
            </div>
  
            <div className="col-md-4">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">📁 All Categories</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
  
      {/* Tasks Table */}
      {filteredTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Category</th>
                <th>Created At</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Project</th>

              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td><strong>{task.title}</strong></td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      className={`form-select form-select-sm 
                        ${task.status === 0 ? "bg-secondary-subtle" : 
                          task.status === 1 ? "bg-info-subtle" : 
                          "bg-success-subtle"}`}
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                    >
                      <option value="0">⏳ Pending</option>
                      <option value="1">🚧 In Progress</option>
                      <option value="2">✅ Completed</option>
                    </select>
                  </td>
                  <td><span className="badge bg-primary">{task.categoryName}</span></td>
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
                    <td>{task.projectName}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No tasks found.</div>
      )}
    </div>
  );
  
/*   return (
    <div>
      <h1>Tasks</h1>


      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ maxWidth: "200px" }}
        />

        <select
          className="form-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "150px" }}
        >
          <option value="all">All Statuses</option>
          <option value="0">Pending</option>
          <option value="1">In Progress</option>
          <option value="2">Completed</option>
        </select>

        <select
          className="form-control"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ maxWidth: "150px" }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                  >
                    <option value="0">Pending</option>
                    <option value="1">In Progress</option>
                    <option value="2">Completed</option>
                  </select>
                </td>
                <td>{task.categoryName}</td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  ); */
};

export default Tasks; 

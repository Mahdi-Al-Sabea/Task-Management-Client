import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (userId) => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Task/User/${userId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    if (tokenData?.user?.id) {
      fetchTasks(tokenData.user.id);
    }
  }, []);

  const groupedTasks = { 0: [], 1: [], 2: [] };

  tasks.forEach((task) => {
    groupedTasks[task.status]?.push(task);
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return "Pending";
      case 1: return "In Progress";
      case 2: return "Completed";
      default: return "Unknown";
    }
  };
  const bgColor = {
    0: "bg-secondary-subtle",   // Pending → neutral gray
    1: "bg-info-subtle",        // In Progress → soft blue
    2: "bg-success-subtle"      // Completed → soft green
  };

  const renderTaskCard = (task) => (
    <div key={task.id} className={`card mb-3 shadow-sm ${bgColor[task.status]}`}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">
          <span className="badge bg-secondary">{task.categoryName}</span><br />
          <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
        </p>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">My Tasks</h2>
      <div className="row">
        {["Pending", "In Progress", "Completed"].map((label, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-header text-center bg-primary text-white">
                <h5 className="mb-0">{label}</h5>
              </div>
              <div className="card-body overflow-auto" style={{ maxHeight: "70vh" }}>
                {groupedTasks[i].length > 0 ? groupedTasks[i].map(renderTaskCard) : (
                  <p className="text-muted text-center">No tasks</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;











/* import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (userId) => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Task/User/${userId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    if (tokenData?.user?.id) {
      fetchTasks(tokenData.user.id);
    }
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return "Pending";
      case 1: return "In Progress";
      case 2: return "Completed";
      default: return "Unknown";
    }
  };

  const groupedTasks = {
    0: [],
    1: [],
    2: []
  };

  tasks.forEach(task => {
    groupedTasks[task.status]?.push(task);
  });

  const statusStyles = {
    0: { backgroundColor: "#e6ffe6" },
    1: { backgroundColor: "#ffe6e6" },
    2: { backgroundColor: "#e6f0ff" }
  };

  const renderTaskCard = (task) => (
    <div key={task.id} style={{ ...statusStyles[task.status], borderRadius: 8, padding: 10, marginBottom: 10 }}>
      <div style={{ fontWeight: "bold" }}>{task.title}</div>
      <div>{new Date(task.dueDate).toLocaleDateString()}</div>
      <div>
        <span style={{
          backgroundColor: "#ddd", padding: "2px 6px", borderRadius: "12px", fontSize: "0.8rem"
        }}>{task.categoryName}</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: 20 }}>
      {["Pending", "In Progress", "Completed"].map((statusLabel, i) => (
        <div key={i} style={{ width: "30%", backgroundColor: "#f4f4f4", borderRadius: 12, padding: 15 }}>
          <h3>{statusLabel}</h3>
          {groupedTasks[i].map(renderTaskCard)}
        </div>
      ))}
    </div>
  );
};

export default Board; */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../Items/ProjectForm";
import TaskTable from "../../Items/TaskTable";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [edit, setEditing] = useState(false);

  const [Users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newTask, setNewTask] = useState({});

  const [showModal, setShowModal] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);



  const getProjectDetails = async () => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Project/${id}`);
      console.log(res.data);
      setProject(res.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `https://localhost:7132/api/Task/${taskId}`
      );
      console.log(res.data);
      getProjectDetails(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const viewTask = async (task) => {
    setSelectedTask(task);
    console.log("Selected task:", task.id);
    setShowModal(true);
  }

  const getUsers = async () => {
    try {
      const res = await axios.get("https://localhost:7132/api/Users");
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:7132/api/Task/categories");
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (edit) {
      // Apply changes
      try {
        const res = await axios.put(
          `https://localhost:7132/api/Project/${id}`,
          {
            name: project.name,
            description: project.description,
          }
        );
        console.log(res.data);
        getProjectDetails(); // Refresh after update
      } catch (error) {
        console.error("Error editing project:", error);
      }
    }

    // Toggle edit mode
    setEditing(!edit);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7132/api/Task", {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        categoryId: newTask.categoryId,
        assignedToUserId: newTask.assignedToUserId,
        projectId: project.id,
        priority: newTask.priority,
      });
      console.log("Task created:", res.data);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        categoryId: "",
        assignedToUserId: "",
        priority: 0,
      });
      getProjectDetails(); // refresh
    } catch (error) {
      console.error("Error creating task:", error);
    }


  }

  useEffect(() => {
    getProjectDetails();
    getCategories();
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>


      <ProjectForm
        project={project}
        edit={edit}
        handleChange={handleChange}
        handleEdit={handleEdit}
      />


      
      <TaskTable
        tasks={project ? project.tasks : []}
        viewTask={viewTask}
        deleteTask={deleteTask}
      />

<div className="container mt-4">
  <div className="card shadow-lg mb-4">
    <div className="card-header text-center">
      <h4>📝 Create New Task</h4>
    </div>
    <div className="card-body">
      <form onSubmit={(e) => handleCreate(e)}>
        <div className="row g-3">

          {/* Task Title */}
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>

          {/* Task Description */}
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows="3"
              required
            ></textarea>
          </div>

          {/* Task Category */}
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={newTask.categoryId}
              onChange={(e) => setNewTask({ ...newTask, categoryId: parseInt(e.target.value) })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assign to User */}
          <div className="col-md-6">
            <label className="form-label">Assign to User</label>
            <select
              className="form-select"
              value={newTask.assignedToUserId}
              onChange={(e) => setNewTask({ ...newTask, assignedToUserId: parseInt(e.target.value) })}
              required
            >
              <option value="">Select User</option>
              {Users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Assign Priority */}
          <div className="col-md-6">
            <label className="form-label">Set Priority</label>
            <select
              className="form-select"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value) })}
              required
            >
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
              <option value="3">Critical</option>
            </select>
          </div>

          {/* Task Due Date */}
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              required
            />
          </div>

        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            ➕ Create Task
          </button>
        </div>
      </form>
    </div>
  </div>
</div>



{/* 

<div className="card shadow-lg mb-4">
    <div className="card-header text-center">
      <h4>Create New Task</h4>
    </div>
    <div className="card-body">
      <form onSubmit={(e) => handleCreate(e)}>
     
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>

     
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          ></textarea>
        </div>

      
        <div className="form-group mb-3">
          <label>Category</label>
          <select
            className="form-control"
            value={newTask.categoryId}
            onChange={(e) =>
              setNewTask({ ...newTask, categoryId: parseInt(e.target.value) })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

   
        <div className="form-group mb-3">
          <label>Assign to User</label>
          <select
            className="form-control"
            value={newTask.assignedToUserId}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignedToUserId: parseInt(e.target.value),
              })
            }
            required
          >
            <option value="">Select User</option>
            {Users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.fullName}
              </option>
            ))}
          </select>
        </div>


         <div className="form-group mb-3">
          <label>Set Priority</label>
          <select
            className="form-control"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: parseInt(e.target.value),
              })
            }
            required
          >
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
            <option value="3">Critical</option>

          </select>
        </div>

      
        <div className="form-group mb-3">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            required
          />
        </div>

 
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Create Task
          </button>
        </div>
      </form>
    </div>
  </div> */}

{/*       <form
        onSubmit={(e)=>{handleCreate(e)}}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={newTask.categoryId}
            onChange={(e) =>
              setNewTask({ ...newTask, categoryId: parseInt(e.target.value) })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Assign to User</label>
          <select
            className="form-control"
            value={newTask.assignedToUserId}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignedToUserId: parseInt(e.target.value),
              })
            }
            required
          >
            <option value="">Select User</option>
            {Users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Create Task
        </button>
      </form> */}






      {showModal && selectedTask && (
  <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await axios.put(`https://localhost:7132/api/Task/${selectedTask.id}`, {
                title: selectedTask.title,
                description: selectedTask.description,
                dueDate: selectedTask.dueDate,
                categoryId: selectedTask.categoryId,
                assignedToUserId: selectedTask.assignedToUserId,
                priority: selectedTask.priority,
              });
              console.log('Task updated:', res.data);
              setShowModal(false);
              setSelectedTask(null);
              getProjectDetails(); 
            } catch (error) {
              console.error('Error updating task:', error);
            }
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                value={selectedTask.title}
                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={selectedTask.description}
                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={selectedTask.categoryId}
                onChange={(e) => setSelectedTask({ ...selectedTask, categoryId: parseInt(e.target.value) })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Assign to User</label>
              <select
                className="form-control"
                value={selectedTask.assignedToUserId}
                onChange={(e) => setSelectedTask({ ...selectedTask, assignedToUserId: parseInt(e.target.value) })}
              >
                {Users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Set Priority</label>
              <select
                className="form-control"
                value={selectedTask.priority}
                onChange={(e) => setSelectedTask({ ...selectedTask, priority: parseInt(e.target.value) })}
              >
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
                <option value="3">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedTask.dueDate?.split('T')[0]}
                onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}



















    </div>
  );
};

export default ProjectDetails;




















     {/*  <table className="table table-striped">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>category</th>
            <th>assigned to</th>
            <th>created at</th>
            <th>due date</th>
          </tr>
        </thead>
        <tbody>
          {project &&
            project.tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.categoryName}</td>
                <td>{task.assignedToUserName}</td>

                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    onClick={() => {
                      viewTask(task);
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}







      {/*       <form>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="name"
            value={project ? project.name : ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={project ? project.description : ""}
            onChange={handleChange}
            disabled={!edit}
          ></textarea>
        </div>
        <button onClick={handleEdit}>{edit ? "Apply" : "Edit"}</button>
      </form> */}
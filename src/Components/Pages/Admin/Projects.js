import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const getProjects = async () => {
    try {
      const res = await axios.get('https://localhost:7132/api/Project');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7132/api/Project', {
        name: projectName,
        description: description,
      });
      setProjectName('');
      setDescription('');
      getProjects(); // Refresh the project list
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://localhost:7132/api/Project/${id}`);
      getProjects(); // Refresh the project list
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Manage Projects</h2>

      <form className="card p-4 mb-5 shadow-sm" onSubmit={addProject}>
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-success">
              Add Project
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/projectDetails/${project.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


















/* 
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');


    const getProjects = async () => {
        try {
        const res = await axios.get('https://localhost:7132/api/Project');
        setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            
        }
    }

    const addProject = async (e) => {
        console.log('Adding project:', projectName, description);
        e.preventDefault();
        try {
            const res=await axios.post('https://localhost:7132/api/Project', {
                name: projectName,
                description: description,
            });
            console.log(res.data);
            getProjects(); 
        } catch (error) {
            console.error('Error adding project:', error);
        }
    }


    const deleteProject = async (id) => {
        console.log('Deleting project with ID:', id);
        try {
            const res=await axios.delete(`https://localhost:7132/api/Project/${id}`);
            console.log(res.data);
            getProjects(); 
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    useEffect(() => {


        getProjects();

    }, []);






  return (



    <div>
      <h2>Projects</h2>
        <form>
            <input type="text" onChange={(e)=>{setProjectName(e.target.value)}} placeholder="Project Name" />
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description" />
            <button type="submit" onClick={addProject}>Add Project</button>
        </form>

      <p>Here you can manage your projects.</p>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>


            
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.createdAt}</td>
              <td><button onClick={()=>navigate(`/projectDetails/${project.id}`)}>View</button></td>
              <td><button onClick={()=>{deleteProject(project.id)}}>Delete</button></td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} */
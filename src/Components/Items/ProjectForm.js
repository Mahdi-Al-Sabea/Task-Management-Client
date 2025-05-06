import React from "react";

const ProjectForm = ({ project, edit, handleChange, handleEdit }) => (
  <div className="container mt-4">
    <div className="card shadow-lg mb-4">
      <div className="card-header text-center">
        <h4>📁 Edit Project</h4>
      </div>
      <div className="card-body">
        <form>
          <div className="row g-3">

            {/* Project Name */}
            <div className="col-md-6 offset-md-3">
              <label htmlFor="projectName" className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="name"
                value={project?.name || ""}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            {/* Project Description */}
            <div className="col-md-6 offset-md-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                value={project?.description || ""}
                onChange={handleChange}
                disabled={!edit}
              ></textarea>
            </div>

          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              onClick={handleEdit}
              className={`btn ${edit ? "btn-success" : "btn-primary"} btn-lg`}
            >
              {edit ? "✅ Apply Changes" : "✏️ Edit Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ProjectForm;









/* import React from "react";

const ProjectForm = ({ project, edit, handleChange, handleEdit }) => (
  <form>
    <div className="card shadow-lg mb-4">
      <div className="card-header text-center">
        <h4>Edit Project</h4>
      </div>
      <div className="card-body">
        <div className="form-group mb-3">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="name"
            value={project?.name || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={project?.description || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="form-group text-center">
          <button
            type="button"
            onClick={handleEdit}
            className={`btn ${edit ? "btn-success" : "btn-primary"} btn-lg`}
          >
            {edit ? "Apply Changes" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  </form>
);

export default ProjectForm;
 */




/* const ProjectForm = ({ project, edit, handleChange, handleEdit }) => (
    <form>
      <div className="form-group">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          className="form-control"
          id="projectName"
          name="name"
          value={project?.name || ""}
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
          value={project?.description || ""}
          onChange={handleChange}
          disabled={!edit}
        />
      </div>
      <button onClick={handleEdit}>{edit ? "Apply" : "Edit"}</button>
    </form>
  );
  
  export default ProjectForm; */
  
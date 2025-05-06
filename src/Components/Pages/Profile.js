


import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [edit, setEditing] = useState(false);
  const [id, setId] = useState(0);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    roleId: 0,
  });

  const getUser = async () => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Users/${id}`);
      const data = res.data;

      const roleId = data.role === "Admin" ? 1 : 2;

      setUser({
        fullName: data.fullName,
        email: data.email,
        passwordHash: "",
        roleId: roleId,
      });

      console.log("User details:", data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (edit) {
      try {
        const res = await axios.put(`https://localhost:7132/api/Users/${id}`, {
          fullName: user.fullName,
          email: user.email,
          passwordHash: user.passwordHash,
          roleId: user.roleId,
        });
        console.log("User updated:", res.data);
        getUser();
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
    setEditing(!edit);
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("tokenData");
    const data = JSON.parse(tokenData);
    if (data && data.user?.id) {
      setId(data.user.id);
    }
  }, []);

  useEffect(() => {
    if (id > 0) {
      getUser();
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👤 My Profile</h2>

      {/* Profile Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Profile Details</h5>
          <form onSubmit={handleEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  disabled={!edit}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!edit}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="roleId" className="form-label">Role</label>
                <select
                  className="form-select"
                  name="roleId"
                  onChange={handleChange}
                  value={user.roleId}
                  disabled={!edit}
                >
                  <option value="1">Admin</option>
                  <option value="2">Employee</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                {edit ? "💾 Save Changes" : "✏️ Edit Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
















/* import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [edit, setEditing] = useState(false);
  const [id, setId] = useState(0);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    roleId: 0,
  });

  const getUser = async () => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Users/${id}`);
      const data = res.data;

      const roleId = data.role === "Admin" ? 1 : 2;

      setUser({
        fullName: data.fullName,
        email: data.email,
        passwordHash: "", // optional, since it's not returned
        roleId: roleId,
      });

      console.log("User details:", data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (edit) {
      // Apply changes
      try {
        const res = await axios.put(`https://localhost:7132/api/Users/${id}`, {
          fullName: user.fullName,
          email: user.email,
          passwordHash: user.passwordHash,
          roleId: user.roleId,
        });
        console.log("User updated:", res.data);
        getUser(); // Refresh after update
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }

    // Toggle edit mode
    setEditing(!edit);
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("tokenData");
    const data = JSON.parse(tokenData);
    if (data && data.user?.id) {
      setId(data.user.id);
    }
  }, []);

  useEffect(() => {
    if (id > 0) {
      getUser();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h4>User Profile</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleEdit}>
                <div className="form-group mb-3">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="roleId">Role</label>
                  <select
                    className="form-control"
                    name="roleId"
                    onChange={handleChange}
                    value={user.roleId}
                    disabled={!edit}
                  >
                    <option value="1">Admin</option>
                    <option value="2">Employee</option>
                  </select>
                </div>

                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {edit ? "Apply Changes" : "Edit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
 */







/* import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
    

  const [edit, setEditing] = useState(false);
  const [id, setId] = useState(0);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    roleId: 0,
  });

  const getUser = async () => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Users/${id}`);
      const data = res.data;
  
      const roleId = data.role === "Admin" ? 1 : 2;
  
      setUser({
        fullName: data.fullName,
        email: data.email,
        passwordHash: "", 
        roleId: roleId,
      });
  
      console.log("User details:", data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (edit) {
     
      try {
        const res = await axios.put(`https://localhost:7132/api/Users/${id}`, {
          fullName: user.fullName,
          email: user.email,
          passwordHash: user.passwordHash,
          roleId: user.roleId,
        });
        console.log("User updated:", res.data);
        getUser(); 
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }

 
    setEditing(!edit);
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("tokenData");
    const data = JSON.parse(tokenData);
    if (data && data.user?.id) {
      setId(data.user.id);
    }
  }, []);
  
  useEffect(() => {
    if (id > 0) {
      getUser();
    }
  }, [id]);

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleEdit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>



        <div className="form-group">
          <label htmlFor="roleId">Role ID</label>
          <div className="mb-3">
            <select className="form-control" name="roleId" onChange={handleChange} value={user.roleId} disabled={!edit}>
            <option value="1">Admin</option>
            <option value="2">Employee</option>
            </select>
            </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {edit ? "Apply Changes" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
 */









/* import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    fullName: '',
    email: '',
    role: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_exp');
    localStorage.removeItem('tokenData');
    navigate('/signin');
  };

  useEffect(() => {
    const tokenData = localStorage.getItem('tokenData');
    const data = tokenData ? JSON.parse(tokenData) : null;
    if (data && data.user) {
      setUserData(data.user);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          📝 Task Manager
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>

            {userData.role === 'Admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Projects</Link>
              </li>
            )}

            {userData.role === 'Employee' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/boards">Boards</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">Tasks</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>

          {userData.fullName && (
            <div className="d-flex align-items-center">
              <span className="text-white me-3 small">
                {userData.fullName} ({userData.role})
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
 */







 import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_exp');
    navigate('/signin');
  };

  const [userData, setUserData] = useState({
    id: null,
    fullName: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const tokenData=localStorage.getItem('tokenData');
    const data = JSON.parse(tokenData);
    console.log('Token Datawewew:', data); // Log the token data to the console
    if (data) {
      
      setUserData(data.user); // Assuming the user data is in the 'user' field
    }


  }, []);

  useEffect(() => {

    console.log('User Data:', userData); // Log the user data to the console

  }, [userData]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">📝 Task Manager </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">


            {userData.role === 'Admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/projects">Projects</Link>
                </li>

              </>
            )}

            {userData.role === 'Employee' && (
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/boards">Boards</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">Tasks</Link>
                </li>
              </>
            )}
                            <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>

          </ul>
                    {userData.fullName && (
            <div className="d-flex align-items-center">
              <span className="text-white me-3 small">
                {userData.fullName} ({userData.role})
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
 
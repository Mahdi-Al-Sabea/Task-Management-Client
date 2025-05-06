// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Dashboard from "./Components/Pages/Employee/Dashboard";
import Projects from "./Components/Pages/Admin/Projects";
import ProjectDetails from "./Components/Pages/Admin/ProjectDetails";
import Layout from "./Components/Layout/Layout";
import axios from "axios";
import Profile from "./Components/Pages/Profile";
import Tasks from "./Components/Pages/Employee/Tasks";
import Boards from "./Components/Pages/Employee/Boards";
// Axios Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token Expiry Check
const isTokenExpired = () => {
  const exp = localStorage.getItem("token_exp");
  return Date.now() > Number(exp);
};

/* const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token || isTokenExpired()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}; */



const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("access_token");
  const tokenData=localStorage.getItem('tokenData'); // Assuming you store the user's role in localStorage
  const data = JSON.parse(tokenData);
  const userRole = data.user.role; // Adjust this based on your token structure

  if (!token || isTokenExpired()) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect if the user doesn't have the correct role
    return <Navigate to="/" replace />;
  }

  return children;
};



// src/App.js
// src/App.js
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes with Layout */}
        <Route element={<PrivateRoute allowedRoles={["Employee", "Admin"]}><Layout /></PrivateRoute>}>
          {/* Common routes for both roles */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Employee-specific routes */}
          <Route path="/dashboard" element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/tasks" element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <Tasks />
            </PrivateRoute>
          } />
          <Route path="/boards" element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <Boards />
            </PrivateRoute>
          } />
          
          {/* Admin-specific routes */}
          <Route path="/projects" element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <Projects />
            </PrivateRoute>
          } />
          <Route path="/projectDetails/:id" element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <ProjectDetails />
            </PrivateRoute>
          } />

          {/* Default route based on role */}
          <Route index element={
            localStorage.getItem('user_role') === 'Admin' 
              ? <Navigate to="/projects" replace /> 
              : <Navigate to="/dashboard" replace />
          } />
        </Route>
      </Routes>
    </Router>
  );
}
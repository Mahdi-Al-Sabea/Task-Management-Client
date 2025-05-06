
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState(2);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7132/api/Users/register', {
        fullname: fullName,
        email: email,
        passwordHash: password,
        roleId: role,
      });
      navigate('/signin');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingFullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label htmlFor="floatingFullName">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-4">
            <select
              className="form-select"
              id="floatingRole"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
            >
              <option value="1">Admin</option>
              <option value="2">Employee</option>
            </select>
            <label htmlFor="floatingRole">Role</label>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-2">
            Sign Up
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate('/signin')}
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
}







/*   import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState(2);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('https://localhost:7132/api/Users/register', {
          fullname:fullName,
          email:email,
          passwordHash:password,
          roleId:role,
        });
        navigate('/signin');
      } catch (err) {
        alert('Registration failed');
      }
    };
  
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <label className=''>Role</label>
          <div className="mb-3">
              <select className="form-control" onChange={(e) => setRole(e.target.value)} value={role}>
              <option value="1">Admin</option>
                <option value="2">Employee</option>

              </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
          <button type="submit" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/signin')}>
          Sign In
        </button>
        </form>
      </div>
    );
  } */
  













  // src/pages/SignUp.js
/* import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7132/api/Users/register', { email, password, fullName });
      navigate('/signin');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
} */
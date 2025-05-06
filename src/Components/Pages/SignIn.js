
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7132/api/Users/login', { email, password });

      //this return token with user data in json


      const { token } = res.data;
      const decoded = jwtDecode(token);

      localStorage.setItem('tokenData', JSON.stringify(res.data));//this contains user data and token
      localStorage.setItem('access_token', token);//take token from response and save it as access token
      localStorage.setItem('token_exp', decoded.exp * 1000);//decode the token and save the expiration time

      if(res.data.user.role === 'Admin'){
        console.log('Admin user');
        navigate('/projects');
      }else if(res.data.user.role === 'Employee'){
        navigate('/dashboard');
      }

    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="text-center mb-4">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating mb-4">
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

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate('/signup')}
          >
            Don’t have an account? Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}




/* 
  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7132/api/Users/login', { email, password });
      const { token } = res.data;

      localStorage.setItem('tokenData', JSON.stringify(res.data));
      const decoded = jwtDecode(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('token_exp', decoded.exp * 1000);
      navigate('/dashboard');
      console.log(res.data);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign In</h2>
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
        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
        <button type="submit" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
 */



























/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7132/api/Users/login', { email, password });
       const { token } = res.data;
      const decoded = jwtDecode(token);
       localStorage.setItem('access_token', token);
      localStorage.setItem('token_exp', decoded.exp * 1000); 
      navigate('/dashboard');
      alert(res.data.token);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
} */
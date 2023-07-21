import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from './Auth.js';

function FormLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loggedIn) {
      return;
    }

    try {
      const token = await login(username, password);

      onLogin(token);
      setLoggedIn(true);

      history.push('/data');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loggedIn) {
    return <Redirect to="/data" />;
  }

  return (
    <div className="formlogin">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;

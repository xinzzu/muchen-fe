import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import NavbarComponent from './components/Navbar';
import FormLogin from './components/FormLogin';
import { isAuthenticated, logout } from './components/Auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setLoggedIn(authenticated);
      } catch (error) {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (token) => {
    setLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    localStorage.removeItem('token');

    // Redirect to FormLogin after logout
    window.location.href = '/';
  };

  return (
    <Router>
      <NavbarComponent loggedIn={loggedIn} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Home /> : <FormLogin onLogin={handleLogin} />}
        </Route>
        <Route path="/data">
          {loggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;

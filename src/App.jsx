import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (username, password) => {
    setError('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setSuccessMessage('Registration successful! Please log in.');
      setView('login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (username, password) => {
    setError('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  
  const AuthPage = () => (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        {view === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => { setView('register'); setError(''); }} error={error} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => { setView('login'); setError(''); }} error={error} successMessage={successMessage} />
        )}
      </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={!token ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <HomePage token={token} handleLogout={handleLogout} /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to={token ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
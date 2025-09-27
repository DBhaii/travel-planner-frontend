import { useState } from 'react';

export default function Register({ onRegister, onSwitchToLogin, error, successMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-slate-800">Create an Account</h2>
      {error && <p className="text-sm text-center text-red-500">{error}</p>}
      {successMessage && <p className="text-sm text-center text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 mt-1 text-slate-800 bg-slate-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mt-1 text-slate-800 bg-slate-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Register
        </button>
      </form>
      <button onClick={onSwitchToLogin} className="w-full text-sm text-indigo-600 hover:underline">
        Already have an account? Login
      </button>
    </div>
  );
}
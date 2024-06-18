'use client';
import { useState } from 'react';
import { login } from '@/app/_lib/api';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(identifier, password);
      if (!response || !response.jwt) {
        setError('Invalid Data Input. Please try again.');
      } else {
        localStorage.setItem('token', response.jwt);
        window.location.href = '/';
      }
    } catch (err) {
      setError('Invalid Data Input. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <p className="text-center">Please fill it correctly</p>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
            >
              Login
            </button>
          </div>
          <div className="relative flex items-center justify-center">
            <span className="absolute px-2 text-sm text-gray-600 bg-white">
              or
            </span>
            <hr className="w-full mt-3 border-t border-gray-300" />
          </div>
          <p className="text-center">
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { register } from '@/app/_lib/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      if (!response) {
        setError('Registration failed. Please try again.');
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <p className="text-center">Create your account</p>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Register
            </button>
          </div>
          <div className="relative flex items-center justify-center">
            <span className="absolute px-2 text-sm text-gray-600 bg-white">
              or
            </span>
            <hr className="w-full mt-3 border-t border-gray-300" />
          </div>
          <p className="text-center">
            Already have an account ?
            <a href="/login" className="text-blue-500 hover:underline">
              <span> Login </span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

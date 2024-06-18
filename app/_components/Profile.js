'use client';
import { useState, useEffect } from 'react';
import { getProfile } from '@/app/_lib/api'; // Sesuaikan path ini
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const profile = await getProfile(token);
      if (profile) {
        setUsername(profile.username);
        setEmail(profile.email);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">
          {loading ? <Skeleton /> : 'Profile'}
        </h2>
        {loading ? (
          <Skeleton height={200} />
        ) : isLoggedIn ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
                <span>{username}</span>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
                <span>{email}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Anda harus login terlebih dahulu.
            </p>
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

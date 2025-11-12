import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate(); // ✅ call it here, at the top
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        formData,
        { withCredentials: true }
      );

      console.log('User registered:', response.data);
      navigate('/notes'); // ✅ use it like this
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-lg shadow-md bg-white h-[400px] w-[400px] flex flex-col justify-center items-center gap-4 p-6"
      >
        <h1 className="text-2xl font-semibold mb-2">Register User</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-3 w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        <h1 className="text-xl">
          Already have an account?{' '}
          <Link className="hover:underline text-blue-600" to="/login">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default UserRegister;

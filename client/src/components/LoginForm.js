// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("login form data", formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      // localStorage.setItem("token", response.data.token);

      console.log(response);
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.error("error", err);

      console.error(err.response.data);
    }
  };

  return (
    <form
      onSubmit={loginHandler}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

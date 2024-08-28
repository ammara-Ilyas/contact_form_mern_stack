import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const defaultForm = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultForm);

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("registration form data", formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      localStorage.setItem("token", response.data.token);

      setFormData(defaultForm);
      navigate("/login");

      // Log the response data
      console.log(response.data);
    } catch (err) {
      // Log the error response
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

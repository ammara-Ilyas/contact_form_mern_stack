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
  const [verifyEmailLink, setVerifyEmailLink] = useState("");
  const [htm, setHtml] = useState("");

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

      setFormData(defaultForm);
      // navigate("/login");

      console.log(response);
      // Assuming the verification URL is included in the response as a simple string.
      const verificationUrl = response.data.verificationUrl;
      console.log("verurl", verificationUrl);
      setHtml(response.data.html);
      // Set the verification link to display
      setVerifyEmailLink(verificationUrl);
    } catch (err) {
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

      {verifyEmailLink && (
        <p className="mt-4 text-green-600">
          Registration successful! Please verify your email by clicking{" "}
          <a href={verifyEmailLink} className="text-indigo-600 underline">
            here.
          </a>
        </p>
      )}

      {htmlContent && (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
    </form>
  );
};

export default RegisterForm;

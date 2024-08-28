import React, { useState } from "react";
import axios from "axios";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactHandle = async (e) => {
    e.preventDefault();
    console.log("formdata", formData);

    try {
      const res = await axios
        .post("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={contactHandle}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
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
        <label className="block text-gray-700 font-bold mb-2">Message</label>
        <textarea
          name="message"
          value={message}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;

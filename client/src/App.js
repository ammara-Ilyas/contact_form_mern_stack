// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegistrationForm";
import Navbar from "./components/layout/Navbar";

const Home = () => (
  <div className="container mx-auto mt-20  flex justify-center flex-col gap-5  items-center">
    <h1 className="text-4xl font-bold text-center">Welcome to MyApp</h1>
    <p className="text-center mt-4">
      This is the home page. Use the navigation bar to explore the app.
    </p>
    <Link to="/contact" className="text-blue-500 underline">
      go to contact page
    </Link>
  </div>
);

const App = () => (
  <Router>
    <Navbar />
    <div className="container mx-auto mt-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;

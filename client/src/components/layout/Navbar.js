import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MyApp
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white  absolute top-5 right-5 inline-flex items-center justify-between md:justify-center p-2 rounded-md hover:bg-indigo-700 md:hidden"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-16 6h16"
              />
            )}
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col  md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto`}
        >
          <Link
            to="/"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded block"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded block"
          >
            Contact
          </Link>
          <Link
            to="/register"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded block"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-white hover:bg-indigo-500 px-3 py-2 rounded block"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

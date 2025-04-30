import React from "react";
import { useState } from "react";
import HERO_IMG from "../assets/help.png";
import HERO from "../assets/hero1.png";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";

const LandingPage = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    setOpenAuthModal(true);
  };

  return (
    <div className="w-full min-h-full bg-white">
      {/* dark:bg-black dark:text-white */}
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <header className="flex justify-between items-center">
          <div className="text-2xl font-extrabold text-gray-800">Cvera</div>
          <button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModal(true)}
          >
            Login / Sign Up
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-10">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                Future in Minutes
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Craft stunning resumes effortlessly. Choose from sleek templates,
              edit live, and export instantly.
            </p>
            <button
              className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={HERO_IMG}
              alt="Cvera Resume Builder"
              className="w-full max-w-md rounded-lg"
            />
            {/* <img src={HERO} alt="Cvera Resume Builder" className="w-full max-w-md" /> */}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-5">
          <h2 className="text-2xl font-bold text-center mb-12">
            Features that Make Your Resume Stand Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Seamless Editing</h3>
              <p className="text-gray-600">
                Build and customize your resume effortlessly with an intuitive
                live editor and modern templates.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                Live Preview Updates
              </h3>
              <p className="text-gray-600">
                See every change instantly. Fine-tune your resume in real-time
                without switching screens or tabs.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                One-Click PDF Export
              </h3>
              <p className="text-gray-600">
                Download a polished, high-resolution PDF version of your resume
                instantly with just one click.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center text-gray-500 text-sm space-y-1 mt-8 mb-4">
        <p>&copy; {new Date().getFullYear()} Cvera Inc. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

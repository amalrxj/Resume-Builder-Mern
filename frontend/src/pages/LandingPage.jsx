import React, { useContext } from "react";
import { useState } from "react";
// import HERO_IMG from "../assets/help.png";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import REC from "../assets/rec.svg";
import { Pencil, Eye, Download } from "lucide-react";
import { UserContext } from "../context/user_Context";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-full bg-white">
      {/* dark:bg-black dark:text-white */}
      <div className="container mx-auto px-5 py-5">
        {/* Header Section */}
        <header className="flex justify-between items-center">
          <div className="text-2xl font-extrabold text-gray-800">Cvera</div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-8">
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
            {/* <p className="text-sm text-gray-500 mt-2">
              No credit card required.
            </p> */}
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={REC}
              alt="Cvera Resume Builder"
              className="w-full max-w-xs rounded-lg"
            />
            {/* <img src={HERO} alt="Cvera Resume Builder" className="w-full max-w-md" /> */}
          </div>
        </div>

        {/* Features Section */}

        <section className="mt-5">
          <p className=" text-center text-xs text-gray-500 uppercase tracking-wider mb-2">
            Our Key Features
          </p>
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Cvera?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 hover:scale-[1.02] text-center">
              <h3 className="text-lg font-semibold mb-4">Seamless Editing</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-[#e6f7f1] rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#7AC789]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 20h9"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16.5 3.5l4 4-13 13H3.5v-4l13-13z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">
                Build and customize your resume{" "}
                <span className="font-medium text-gray-800">effortlessly</span>{" "}
                with an
                <span className="font-medium text-gray-800">
                  {" "}
                  intuitive editor
                </span>{" "}
                and sleek templates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 hover:scale-[1.02] text-center">
              <h3 className="text-lg font-semibold mb-4">
                Live Preview Updates
              </h3>
              <div className="flex justify-center mb-4">
                <div className="bg-[#e6f7f1] rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#7AC789]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553 2.276A1 1 0 0120 13.118V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.882a1 1 0 01.447-.842L9 10"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 10V4a1 1 0 011-1h4a1 1 0 011 1v6"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">
                See every change{" "}
                <span className="font-medium text-gray-800">instantly</span>.
                Fine-tune your resume in
                <span className="font-medium text-gray-800">
                  {" "}
                  real-time
                </span>{" "}
                without switching tabs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 hover:scale-[1.02] text-center">
              <h3 className="text-xl font-semibold mb-4">
                One-Click PDF Export
              </h3>
              <div className="flex justify-center mb-4">
                <div className="bg-[#e6f7f1] rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#7AC789]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v16h16V4H4zm4 4h8M8 12h8m-8 4h5"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-500">
                Download a{" "}
                <span className="font-semimedium text-gray-800">
                  polished, high-res PDF
                </span>{" "}
                version of your resume
                <span className="font-semimedium text-gray-800">
                  {" "}
                  instantly
                </span>{" "}
                with just one click.
              </p>
            </div>
          </div>
        </section>

        {/* Helpful Resume Tips & Guides */}
        {/* <section className="max-w-6xl mx-auto mt-20 px-4">
          <h2 className="text-2xl font-bold text-center mb-10">
            Helpful Resume Tips & Guides
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Top 5 Resume Tips for 2025
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Avoid common mistakes and stand out with modern resume
                practices.
              </p>
              <a
                href="#"
                className="text-[#7AC789] font-medium hover:underline"
              >
                Read More →
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How to Craft a Resume That Gets You Hired
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Proven structure, power words, and layout tips to impress
                recruiters.
              </p>
              <a
                href="#"
                className="text-[#7AC789] font-medium hover:underline"
              >
                Read More →
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Resume Template vs. Custom Design
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Which one suits your career goals best? A deep dive.
              </p>
              <a
                href="#"
                className="text-[#7AC789] font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>
        </section> */}

        {/* User Testimonials Section 
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            What Our Users Are Saying
          </h2>
          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="flex mb-2">
                <svg
                  className="h-6 w-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l3.09 1.63-.87-4.16L15 8.84l-4.19-.36L10 4l-1.81 4.48L4 8.84l2.78 3.63-.87 4.16L10 15z" />
                </svg>
                <svg
                  className="h-6 w-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l3.09 1.63-.87-4.16L15 8.84l-4.19-.36L10 4l-1.81 4.48L4 8.84l2.78 3.63-.87 4.16L10 15z" />
                </svg>
                <svg
                  className="h-6 w-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l3.09 1.63-.87-4.16L15 8.84l-4.19-.36L10 4l-1.81 4.48L4 8.84l2.78 3.63-.87 4.16L10 15z" />
                </svg>
                <svg
                  className="h-6 w-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l3.09 1.63-.87-4.16L15 8.84l-4.19-.36L10 4l-1.81 4.48L4 8.84l2.78 3.63-.87 4.16L10 15z" />
                </svg>
                <svg
                  className="h-6 w-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l3.09 1.63-.87-4.16L15 8.84l-4.19-.36L10 4l-1.81 4.48L4 8.84l2.78 3.63-.87 4.16L10 15z" />
                </svg>
              </div>
              <p className="text-gray-600">
                "Cvera helped me create the perfect resume in no time. Great
                experience!"
              </p>
              <p className="text-gray-600 font-semibold mt-2">
                John Doe, Web Developer
              </p>
            </div>
          </div>
        </section>*/}

        {/* Frequently Asked Questions */}
        <section className="max-w-4xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white p-4 rounded-xl shadow-sm cursor-pointer group">
              <summary className="font-medium text-lg text-gray-800 flex justify-between items-center">
                How is it free?
                <svg
                  className="w-5 h-5 text-[#7AC789] transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 mt-2">
                Cvera is free to use with core features. We may offer premium
                templates or services in the future.
              </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-sm cursor-pointer group">
              <summary className="font-medium text-lg text-gray-800 flex justify-between items-center">
                Can I edit my resume later?
                <svg
                  className="w-5 h-5 text-[#7AC789] transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 mt-2">
                Absolutely! Your resume stays saved. You can log back in anytime
                and make changes instantly.
              </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-sm cursor-pointer group">
              <summary className="font-medium text-lg text-gray-800 flex justify-between items-center">
                Is my data safe with Cvera?
                <svg
                  className="w-5 h-5 text-[#7AC789] transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="text-gray-600 mt-2">
                Yes! We prioritize your privacy and use secure protocols to
                protect your information at all times.
              </p>
            </details>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied users and start building your resume
            today!
          </p>
          <button
            className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200"
            onClick={handleCTA}
          >
            Get Started
          </button>
        </section>
      </div>

      {/* Footer Section */}
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

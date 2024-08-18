import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../images/intelliroute_logo.png";

const LandingPageNewU = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [modalVisible, setModalVisible] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = () => {
    window.location.href = "https://dashboard.intelliroute-ai.com/register";
  };

  const handleOptionClick = (url) => {
    setModalVisible(false);
    navigate(url);
  };

  useEffect(() => {
    const appHeader = document.querySelector(".header-nav");
    const appSidebar = document.querySelector(".sidebar");

    if (appHeader) appHeader.style.display = "none";
    if (appSidebar) appSidebar.style.display = "none";

    return () => {
      if (appHeader) appHeader.style.display = "";
      if (appSidebar) appSidebar.style.display = "";
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white" ref={containerRef}>
      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Welcome to IntelliRoute</h2>
            <p className="mb-4">What best describes your current need?</p>
            <button
              className="w-full bg-teal-500 text-white py-2 rounded mb-3 hover:bg-teal-600"
              onClick={() => handleOptionClick("/new-to-ai")}
            >
              New to AI? Start Here
            </button>
            <button
              className="w-full bg-pink-500 text-white py-2 rounded mb-3 hover:bg-pink-600"
              onClick={() => handleOptionClick("/optimize-ai-costs")}
            >
              Already Using AI? Optimize Costs
            </button>
            <button
              className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              onClick={() => setModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="IntelliRoute AI Logo" className="h-8" />
          </a>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Features
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Pricing
            </a>
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              onClick={handleNavigation}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
          <motion.div className="container text-center" style={{ opacity }}>
            <motion.h1
              className="text-5xl font-bold mb-4 text-pink-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Step into AI with Confidence
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover how easy it is to integrate AI into your business. Our
              intuitive platform guides you through every step, making advanced
              AI accessible and manageable for everyone.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                onClick={handleNavigation}
              >
                Start Your Journey
              </button>
              <button
                className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900"
                onClick={handleNavigation}
              >
                Request a Demo
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Value Props Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">
              Why Choose IntelliRoute?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy Integration",
                  description:
                    "Our platform is designed to make AI integration simple and straightforward, with no prior experience required.",
                },
                {
                  title: "Guided Support",
                  description:
                    "We provide comprehensive support and resources to help you at every stage of your AI journey.",
                },
                {
                  title: "Scalable Solutions",
                  description:
                    "Start small and scale as you grow. Our solutions are designed to adapt to your evolving needs.",
                },
              ].map((prop, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-teal-400">
                    {prop.title}
                  </h3>
                  <p>{prop.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-pink-400">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "User-Friendly Interface",
                "Step-by-Step Integration Guides",
                "Dedicated Support Team",
                "Simple Configuration Options",
                "Scalable to Your Needs",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="w-6 h-6 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">
              Hear from Our Customers
            </h2>
            <motion.div
              className="bg-gray-700 rounded-lg p-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <blockquote className="mb-4">
                "IntelliRoute made integrating AI into our business so simple.
                Their support and user-friendly tools were exactly what we
                needed to get started."
              </blockquote>
              <cite className="text-pink-400">Jane Doe, CEO, StartupX</cite>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8 text-pink-500"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Start Your AI Journey?
            </motion.h2>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join IntelliRoute today and see how easy it is to bring AI into
              your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button
                className="bg-teal-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600"
                onClick={handleNavigation}
              >
                Get Started
                <svg
                  className="w-6 h-6 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 IntelliRoute AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageNewU;

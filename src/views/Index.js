/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "./components/Navbars/IndexNavbar";
import Footer from "./components/Footers/Footer";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />

      {/* Hero Section */}
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Welcome to Your New Project!
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                This project is built using React and Tailwind CSS. Explore our
                components, utilities, and start building your next amazing
                product.
              </p>
              <div className="mt-12">
                <Link
                  to="/get-started"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="Pattern"
        />
      </section>
      {/* Features Section */}
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4">
              <h2 className="text-3xl font-semibold">Our Features</h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Core Features Cost Optimization with Intelligent Routing: Smart
                Model Selection: Routes tasks to the most cost-effective model,
                whether it's GPT-4, an open-source model, or a local model.
                Dynamic Configuration: Optimizes for cost, speed, or quality
                based on user-defined criteria. Adaptive Algorithms: Leverages
                the latest algorithmic techniques like Chain of Thought and
                Mixture of Agents to boost quality. Customizable Routing Logic:
                Allows businesses to tweak routing based on their specific
                needs. Robust API: Offers a simple drop-in replacement for
                existing LLM endpoints. Caching and Benchmarking: Ensures
                consistent, high-quality responses while reducing latency and
                costs. Local Model Support: Allows companies to run models on
                local machines, improving data security and reducing dependency
                on external providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Pages Section */}
      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 px-4">
              <h5 className="text-xl font-semibold pb-4 text-center">
                Login Page
              </h5>
              <Link to="/auth/login">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="Login Page"
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={require("assets/img/login.jpg").default}
                  />
                </div>
              </Link>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <h5 className="text-xl font-semibold pb-4 text-center">
                Profile Page
              </h5>
              <Link to="/profile">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="Profile Page"
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={require("assets/img/profile.jpg").default}
                  />
                </div>
              </Link>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <h5 className="text-xl font-semibold pb-4 text-center">
                Landing Page
              </h5>
              <Link to="/landing">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="Landing Page"
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={require("assets/img/landing.jpg").default}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

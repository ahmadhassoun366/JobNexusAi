import React from 'react';
import { BsLightbulbFill } from 'react-icons/bs';
import { FaPoll, FaRobot } from 'react-icons/fa';

const Services = () => {
  return (
    <section className="pb-20 relative block bg-gray-900">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: "80px" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-900 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-white">
              Transforming Recruitment with AI
            </h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
              Harness the power of artificial intelligence to revolutionize the recruitment process. Streamline and optimize your hiring procedures like never before.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-12 justify-center">
          <div className="w-full lg:w-3/12 px-4 text-center">
            <div className="text-yellow-600 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <FaRobot size={25} />
            </div>
            <h6 className="text-xl mt-5 font-semibold text-white">
              Intelligent Candidate Screening
            </h6>
            <p className="mt-2 mb-4 text-gray-500">
              Leverage AI algorithms to analyze resumes and identify the most qualified candidates efficiently.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center">
            <div className="text-red-600 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <FaPoll size={25} />
            </div>
            <h5 className="text-xl mt-5 font-semibold text-white">
              Data-driven Decision Making
            </h5>
            <p className="mt-2 mb-4 text-gray-500">
              Utilize data analytics and AI insights to make informed hiring decisions and optimize your recruitment strategy.
            </p>
          </div>
          <div className="w-full lg:w-3/12 px-4 text-center">
            <div className="text-blue-600 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <BsLightbulbFill size={25} />
            </div>
            <h5 className="text-xl mt-5 font-semibold text-white">
              Streamlined Hiring Process
            </h5>
            <p className="mt-2 mb-4 text-gray-500">
              Automate repetitive tasks and eliminate bottlenecks to accelerate the hiring process and improve overall efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

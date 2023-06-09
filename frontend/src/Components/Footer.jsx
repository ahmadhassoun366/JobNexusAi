import React from "react";

import  {BsLinkedin,BsGithub,BsDribbble} from 'react-icons/bs';
import {FaFacebookSquare} from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gray-300 pt-8 pb-6">
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
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6">
      <button
        className="bg-white text-blue-900 shadow-lg font-normal items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
        type="button"
      >
        <BsLinkedin size={25}/>
      </button>
      <button
        className="bg-white text-blue-600 shadow-lg font-normal items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
        type="button"
      >
        <FaFacebookSquare size={25}  />
      </button>
      <button
        className="bg-white text-pink-400 shadow-lg font-normal items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
        type="button"
      >
        <BsDribbble size={25}/>
      </button>
      <button
        className="bg-white text-gray-900 shadow-lg font-normal items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
        type="button"
      >
        <BsGithub  size={25}/>
      </button>
    </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                       >About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        >Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                       >Github
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                       >Free Products
                    </Link>
                  </li>

                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                   >MIT License
                  </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        >Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        >Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        >Contact Us
                    </Link>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}JobNexus AI by{" "}
              <Link
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-900"
              >
                Creative Team
              </Link>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

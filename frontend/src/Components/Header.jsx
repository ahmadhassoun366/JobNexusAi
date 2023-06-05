import React, { useState } from 'react';
import Logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header>
      <nav className="fixed z-20 w-full text-white dark:bg-gray-900/80  navbar  dark:border-gray-800 peer-checked:navbar-active dark:shadow-none">
        <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0 lg:py-5">
            <div className="w-full items-center flex justify-between lg:w-auto">
              <img src={Logo} className="mr-5 h-8 sm:h-10" alt="logo" />
              <span className="self-center text-xl text-white  first-letter:font-semibold whitespace-nowrap dark:text-white">JobNexus <span className='text-xl text-teal-900 font-bold'>Ai</span></span>

              <label
                htmlFor="hbr"
                className="peer-checked:hamburger text-white first-letter:block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
              >
                <div
                  aria-hidden="true"
                  className="m-auto h-0.5 w-5 rounded text-white bg-gray-900 dark:bg-gray-300 transition duration-300"
                ></div>
                <div
                  aria-hidden="true"
                  className="m-auto mt-2 h-0.5 w-5 rounded text-white bg-gray-900 dark:bg-gray-300 transition duration-300"
                ></div>
              </label>
            </div>
            <div className="navmenu hidden w-full flex-wrap justify-between items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
              <div className="text-white dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                  <li>
                    <Link
                      to='/'
                      className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
                    >
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/blogs'
                      className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
                    >
                      <span>Blog</span>
                    </Link>
                  </li>
                  <li>
                  <a href="#" className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                      <button
                        id="mega-menu-full-cta-image-button"
                        onMouseOver={toggleDropdown}
                        className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white    border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Services
                        <svg
                          className="w-5 h-5 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
                <a
                  href="/register"
                  className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <span className="relative text-sm font-semibold text-primary dark:text-primaryLight">
                    Sign Up
                  </span>
                </a>
                <Link
                to='/login'
                  className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-gray-800 dark:before:bg-sky-400 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
     {/* Dropdown Content */}
     {isDropdownOpen && (
        <div
          onMouseLeave={closeDropdown}
          id="mega-menu-full-image-dropdown"
          className="my-5  bg-gray-50 border-gray-200 shadow-sm rounded-lg border-y dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul className="hidden mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Segmentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Marketing CRM
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Online Stores
                </a>
              </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  License
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  Resources
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="p-8 text-left bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
              style={{ backgroundImage: 'url(https://www.windsoracademytrust.org.uk/assets/hero-images/Job-Vacancies-and-Careers/windsor-academy-trust-job-vacancies__FocusFillWzEyMDAsNjc1LCJ4IiwyNjdd.jpeg)' }}
            >
              <p className="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">
                Preview the new Flowbite dashboard navigation.
              </p>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700"
              >
                Get started
                <svg
                  className="w-4 h-4 ml-1 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      )}
          {/* End of Dropdown Content */}
        </div>
      </nav>
    </header>
  );
};

export default Header;

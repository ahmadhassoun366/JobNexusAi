import React, { useState, useContext } from 'react';
import Logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';
import { GiHamburgerMenu } from 'react-icons/gi';
const Header = () => {
  const id = localStorage.getItem('seekerId');

  const { isAuthenticated, logout } = useContext(AuthContext);

  const storedUserId = localStorage.getItem('userId');

  const [open, setOpen] = useState(false);





  const handleLogout = () => {
    // Handle logout functionality, e.g., clear local storage, update login status, etc.
    logout()
  };

  return (
    <header>
      <nav className="w-full z-20 text-white bg-gray-900/100 navbar dark:border-gray-800 dark:shadow-none">
        <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:py-2 md:gap-0 lg:py-4">
            <div className="w-full items-center flex justify-between lg:w-auto">
              <img src={Logo} className="mr-5 h-8 sm:h-10" alt="logo" />
              <span className="self-center text-xl text-white first-letter:font-semibold whitespace-nowrap dark:text-white">JobNexus <span className="text-2xl font-bold">Ai</span></span>
              <div
                onClick={() => setOpen(!open)}
                className={`z-[999]  ${open ? "text-gray-900" : "text-gray-100"
                  } text-3xl md:hidden m-5`}
              >
                <GiHamburgerMenu name="menu"></GiHamburgerMenu>
              </div>
              <div
                className={`md:hidden text-gray-900 fixed inset-y-0 right-0 z-20 w-4/5 max-w-xs px-7 py-2 font-medium bg-white duration-300 transform ${open ? "translate-x-0" : "translate-x-full"
                  }`}
              >
                <ul className="flex flex-col justify-center h-full gap-10 py-2 text-lg text-center">
                  <li
                    onClick={() => setOpen(false)}
                    className="px-6 hover:text-cyan-600"
                  >
                  </li>
                  <li>
                    <Link to='/'>
                      Home
                    </Link>

                  </li>
                  {!isAuthenticated && (
                    <Link
                      to="/register"

                    >
                      <span >
                        Sign Up
                      </span>
                    </Link>
                  )}
                  {!isAuthenticated && (
                    <Link
                      to="/login"

                    >
                      <span>
                        Login
                      </span>
                    </Link>
                  )}

                  {isAuthenticated && (
                    <li>
                      <Link to={`/profile/${storedUserId}`} >
                        <button
                          id="mega-menu-full-cta-image-button"

                        >
                          Profile
                        </button>
                      </Link>
                    </li>
                  )}
                  {isAuthenticated ? (
                    <li>
                      <button
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>

                    </li>
                  )}

                </ul>
              </div>
            </div>
            <div className="navmenu hidden w-full flex-wrap justify-between items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
              <div className="text-white dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                  <li>
                    <Link to="/" className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                      <span>Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                      <button
                        id="mega-menu-full-cta-image-button"
                        className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Services
                      </button>
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link to={`/profile/${storedUserId}`} className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                        <button
                          id="mega-menu-full-cta-image-button"
                          className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Profile
                        </button>
                      </Link>
                    </li>
                  )}
                  {isAuthenticated ? (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>

                    </li>
                  )}
                </ul>
              </div>

              <div className="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-sm font-semibold text-primary dark:text-primaryLight">
                      Sign Up
                    </span>
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-gray-800 dark:before:bg-sky-400 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                      Login
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

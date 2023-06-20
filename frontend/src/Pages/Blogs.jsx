import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/blogsList/`);
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Render the blogs in your component
  return (
    <>
      <Navbar />



      <section className="blog text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Blog</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-base">
              J'aime bien partager mes connaissances et des recherches intéressantes, pour le faire j'ai mis en place un blog personnel.
            </p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80)" }}></div>
              <div className="w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                <div className="header-content inline-flex">
                  <div className="category-badge flex-1 h-4 w-4 m rounded-full m-1 bg-purple-100">
                    <div className="h-2 w-2 rounded-full m-1 bg-purple-500"></div>
                  </div>
                  <div className="category-title flex-1 text-sm">PHP</div>
                </div>
                <div className="title-post font-medium">Mon titre</div>
                <div className="summary-post text-base text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm"><span className="">Learn more</span></button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80)" }}></div>
              <div className="w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                <div className="header-content inline-flex">
                  <div className="category-badge flex-1 h-4 w-4 m rounded-full m-1 bg-yellow-100">
                    <div className="h-2 w-2 rounded-full m-1 bg-yellow-500"></div>
                  </div>
                  <div className="category-title flex-1 text-sm">JS</div>
                </div>
                <div className="title-post font-medium">Mon titre</div>
                <div className="summary-post text-base text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 px-2 mt-4 block rounded p-2 text-sm"><span className="">Learn more</span></button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1590608897129-79da98d15969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80)" }}></div>
              <div className="w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
                <div className="header-content inline-flex">
                  <div className="category-badge flex-1 h-4 w-4 m rounded-full m-1 bg-green-100">
                    <div className="h-2 w-2 rounded-full m-1 bg-green-500"></div>
                  </div>
                  <div className="category-title flex-1 text-sm">Vue</div>
                </div>
                <div className="title-post font-medium">Mon titre</div>
                <div className="summary-post text-base text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 px-2 mt-4 block rounded p-2 text-sm"><span className="">Learn more</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">From the blog</h1>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {blogs.map((blog) => (
            <div  key={blog.id} className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={`http://127.0.0.1:8000/${blog.image}`} alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                {blog.title}
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 July2023</span>
              </div>
            </div>
 ))}
            {/* <div className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                  How to use sticky note for problem solving
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 July2023</span>
              </div>
            </div>

            <div className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                  Morning routine to boost your mood
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 25 June 2020</span>
              </div>
            </div>

            <div className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80" alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                  All the features you want to know
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 30 September 2020</span>
              </div>
            </div>

            <div className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80" alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                  Minimal workspace for your inspirations
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 13 July2023</span>
              </div>
            </div>

            <div className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                  What do you want to know about Blockchane
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 July2023</span>
              </div> 
            </div> */}
          </div>
        </div>
      </section>


      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-20">
      <Linkrticle className=''>
      <h1 className="text-4xl font-semibold leading-9 text-center text-gray-900 	 dark:text-gray-50 mt-10 ">Blogs</h1>
          <section className="mt- grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
          {blogs.map((blog) => (
            <Linkrticle
              key={blog.id}
              className="mt-10 relative w-full h-64 bg-cover bg-center group rounded-lg drop-shadow-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              style={{ backgroundImage: `url("http://127.0.0.1:8000/${blog.image}")` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <Link className="text-white text-sm font-bold text-center" href="#">
                    <span className="absolute inset-0"></span>
                    {blog.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </section>
      </article>
    </section> */}

    </>
  );
};

export default BlogList;

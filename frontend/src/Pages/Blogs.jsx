import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import blog1 from '../assets/img/blog1.jpg'
import blog2 from '../assets/img/blog2.jpg'
import blog3 from '../assets/img/blog3.jpg'

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



      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">From the blog</h1>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {blogs.map((blog) => (
            <div  key={blog.id} className="lg:flex">
              <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={`${process.env.REACT_APP_JOB_API_URL}/${blog.image}`} alt="" />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                {blog.title}
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">{blog.text}</span>
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

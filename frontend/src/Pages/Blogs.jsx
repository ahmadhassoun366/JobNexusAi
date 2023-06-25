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
              <div key={blog.id} className="lg:flex">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={`${process.env.REACT_APP_JOB_API_URL}/${blog.image}`} alt="" />

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                  <Link className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                    {blog.title}
                  </Link>

                  <span className="text-sm text-gray-500 dark:text-gray-300">{blog.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




    </>
  );
};

export default BlogList;

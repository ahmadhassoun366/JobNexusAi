import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { BsFillArrowDownSquareFill } from 'react-icons/bs';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { AuthContext } from '../Services/AuthContext';

const Alljobs = () => {
  let [jobs, setJobs] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getAllJobs();
  }, []);

  let getAllJobs = async () => {
    // let response = await fetch(process.env.REACT_APP_JOB_API_URL, {
    let response = await fetch("http://127.0.0.1:8000/users/api/job/", {
      method: "GET",
    });

    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setJobs(data);
    } else if (response.statusText === "Unauthorized") {
      console.log("can't get jobs");
    }
  };


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],


  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center sm:px-5 md:flex-row mt-16">
        <div className="flex flex-col items-center justify-center w-full h-full pt-6 pr-0 pl-0 md:mb-0 md:w-1/2 ">
          <div className="flex flex-col items-start gap-5 justify-center h-full space-y-3 ml-28 transform md:pr-10 lg:pr-16
            md:space-y-5 ">
            <div className="bg-gray-700 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
              uppercase ">
              <p className="inline">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </p>
              <p className="inline text-xs font-medium">New</p>
            </div>
            <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">AI in Recruitment</a>
            <p className="text-3xl font-medium inline">Revolutionizing the Job Seeking Process</p>
            <p>Looking for a job? Discover how the recruitment system works and gain valuable tips to enhance your job-seeking journey.</p>
            <div className="flex justify-center w-full" >
              <button>
                <BsFillArrowDownSquareFill size={50} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[320px] shadow-xl">
          <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-[290px] h-[572px] bg-white dark:bg-gray-800">
            <img src="https://media1.giphy.com/media/wZiAeWlhfLUH8Bdpkr/200w.gif?cid=6c09b952txe4pos8v4ja5gk6l5k9ki250orryb8qeaomwjoo&ep=v1_gifs_search&rid=200w.gif&ct=g" className="dark:hidden w-[290px] h-[572px]" alt="" />
          </div>
        </div>

      </div>

      <div>
      </div>

      <div className="flex flex-col items-center justify-center my-20 bg-gray-100 py-24 gap-10">
        <h1 className="text-4xl font-bold text-center leading-none lg:text-5xl xl:text-5xl text-gray-900">
          Most In-Demand Jobs
        </h1>

        <AliceCarousel

          items={jobs.slice(0, 5).map((job) => (
            <div key={job?.id} className="relative bg-white py-6 px-6 rounded-3xl w-80 my-8 mx-20 mb-20">
              <img src={`http://127.0.0.1:8000/${job.company.logo}`} className="flex-shrink-0 object-cover rounded-full btn- w-12 h-12 mb-8" />

              <div className="mt-8">
                <p className="text-xl font-semibold my-2">{job?.title}</p>
                <div className="flex space-x-2 font-bold">
                  <p>{job?.company.name}</p>
                </div>
                <div className="flex text-gray-700 text-base my-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{job?.country.name}</p>

                  <div className="flex ml-24 gap-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="font-semibold text-base mb-2">{job.type.type}</p>
                  </div>
                </div>
                <div className="border-t-2"></div>
                <div className="flex justify-between">
                  <div className="my-2">
                    <div className="flex flex-row space-x-5 my-3">
                      <p className="font-semibold text-base mb-2">Recruiter</p>
                      <img src={`http://127.0.0.1:8000/${job.recruiter.profilePicture}`} className="w-6 h-6 rounded-full" />

                    </div>
                    {isAuthenticated ? (
                          <Link
                            to={`/jobDetails/${job.id}`}
                            className="bg-gray-900 mr-10 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                          >
                            Apply Now
                        
                            </Link>
                        ) : (
                          <Link
                            to="/login"
                            className="bg-gray-900 mr-10 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                          >
                            Login to Apply
                          </Link>
                        )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          responsive={{ 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 3 }, 1280: { items: 4 } }}
          autoPlay={true}
          infinite={true} // Enable looping
          animationType="custom" // Set animation type to custom
          animationDuration={1000} // Set animation duration in milliseconds
          animationEasingFunction="ease-in-out" // Set animation easing function
        />
        <button className="px-6 py-2 mt-8 bg-gray-900 text-white rounded-lg shadow-2xl">
          See All Jobs
        </button>
      </div>

      <div className="bg-white pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto  sm:px-6 lg:px-8">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">Open Positions</p>
                <p className="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">Lorem ipsum dolor sit amet, consectetur
                  adipis</p>
              </div>
              <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                <p className="sr-only">Search Position</p>
                <div className="relative">
                  <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                    <p>
                      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21
                    21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </p>
                  </div>
                  <input placeholder="Search Positions " type="search" className="border block pt-2 pr-0 pb-2 pl-10 w-full py-2
                 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"/>
                </div>
              </div>
            </div>
            <div className="shadow-2xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
              <div className="pt--10 pr-0 pb-10 pl-0">
                {jobs.map((job) => (

                  <div key={job?.id} className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex items-center flex-1 min-w-0">
                        <img
                          src={`http://127.0.0.1:8000/${job.company.logo}`} className="flex-shrink-0 object-cover rounded-full btn- w-12 h-12   mb-8 " />
                        <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                          <p className="text-lg font-bold text-gray-800 truncate">{job.title}</p>
                          <p className="text-gray-600 text-md">{job.company.name}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="bg-gray-300 text-gray-900 rounded-full px-3 py-1 text-sm">{job.locationType.locationType}</span>
                            <span className="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>{job.type.type}</span>
                          </div>
                        </div>

                      </div>
                      <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                        {isAuthenticated ? (
                          <Link
                            to={`/jobDetails/${job.id}`}
                            className="bg-gray-900 mr-10 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                          >
                            Apply Now
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </Link>
                        ) : (
                          <Link
                            to="/login"
                            className="bg-gray-900 mr-10 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                          >
                            Login to Apply
                          </Link>
                        )}

                      </div>
                    </div>
                    <hr className="mt-5 "></hr>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* <div className="flex items-center justify-center">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
    
        <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
               
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="mt-8">
                <p className="text-xl font-semibold my-2">App Development</p>
                <div className="flex space-x-2 text-gray-400 text-sm">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                     <p>Marketing Team</p> 
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                     <p>1 Weeks Left</p> 
                </div>
                <div className="border-t-2"></div>

                <div className="flex justify-between">
                    <div className="my-2">
                        <p className="font-semibold text-base mb-2">Team Member</p>
                        <div className="flex space-x-2">
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                            className="w-6 h-6 rounded-full"/>
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg" 
                            className="w-6 h-6 rounded-full"/>
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU" 
                            className="w-6 h-6 rounded-full"/>
                        </div>
                    </div>
                     <div className="my-2">
                        <p className="font-semibold text-base mb-2">Progress</p>
                        <div className="text-base text-gray-400 font-semibold">
                            <p>34%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}

      <style>
        {`
    .alice-carousel__prev-btn,
    .alice-carousel__next-btn {
      display: none !important;
    }
    `}
      </style>
    </>

  );
};

export default Alljobs;

import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Alljobs = () => {
  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  let getAllJobs = async () => {
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

  return (
  <>
    <Navbar/>

<div class="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
    <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
        {/* <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png" class="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl" alt="" />
        <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png" class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt="" />
         */}

<iframe src="https://giphy.com/embed/hp8svqfEfk7q4qPgfy" width="495" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p></p></div>
</div>
<div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
</div>

</div>
    


<div class="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
  <div class="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
      <div class="pt-0 pr-4 pb-0 pl-4 mt-24 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-xl font-bold text-gray-900">Open Positions</p>
          <p class="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">Lorem ipsum dolor sit amet, consectetur
              adipis</p>
        </div>
        <div class="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
          <p class="sr-only">Search Position</p>
          <div class="relative">
            <div class="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
              <p>
                <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                    stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21
                    21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </p>
            </div>
            <input placeholder="Search Positions " type="search" class="border block pt-2 pr-0 pb-2 pl-10 w-full py-2
                 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"/>
          </div>
        </div>
      </div>
      <div class="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
        <div class="pt--10 pr-0 pb-10 pl-0">
        {jobs.map((job) => (

          <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
              <div class="flex items-center flex-1 min-w-0">
                <img
                    src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill" class="flex-shrink-0 object-cover rounded-full btn- w-12 h-12   mb-8 "/>
                <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                  <p class="text-lg font-bold text-gray-800 truncate">{job.title}</p>
                  <p class="text-gray-600 text-md">{job.company.name}</p>
                  <div className="flex items-center gap-3 mt-2">
                <span className="bg-gray-300 text-gray-900 rounded-full px-3 py-1 text-sm">{job.locationType.locationType}</span>
                <span className="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>{job.type.type}</span>
              </div>
                </div>
                
              </div>
              <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
              <Link to={`/jobDetails/${job.id}`} className="bg-gray-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Apply Now <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              </Link>
              </div>
            </div>
            <hr className="mt-5 "></hr>
          </div>
          

))}

          <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
              <div class="flex items-center flex-1 min-w-0">
                <img src="https://www.growthmarketingpro.com/wp-content/uploads/2019/10/basecamp-logo.png"
                    class="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                  <p class="text-lg font-bold text-gray-800 truncate">Senior Software Engineer</p>
                  <p class="text-gray-600 text-md">Basecamp</p>
                </div>
              </div>
              <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                  sm:mt-0">
                <a href="" class="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-gray-700 rounded-lg">Apply</a>
              </div>
            </div>
          </div>

        
          <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
              <div class="flex items-center flex-1 min-w-0">
                <img src="https://djmag.com/sites/default/files/article/image/Spotify.png" class="flex-shrink-0
                    object-cover rounded-full btn- w-10 h-10"/>
                <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                  <p class="text-lg font-bold text-gray-800 truncate">Frontend Developer</p>
                  <p class="text-gray-600 text-md">Spotify</p>
                </div>
              </div>
              <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                  sm:mt-0">
                <a href="" class="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-gray-700 rounded-lg">Apply</a>
              </div>
            </div>
          </div>


          <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
              <div class="flex items-center flex-1 min-w-0">
                <img src="https://miro.medium.com/max/512/1*n81Kr3UGUVsF0LLRgRQrJw.jpeg" class="flex-shrink-0
                    object-cover rounded-full btn- w-10 h-10"/>
                <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                  <p class="text-lg font-bold text-gray-800 truncate">Lead Software Engineer</p>
                  <p class="text-gray-600 text-md">Figma</p>
                </div>
              </div>
              <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                  sm:mt-0">
                <a href="" class="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-gray-700 rounded-lg">Apply</a>
              </div>
            </div>
          </div>

          <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
              <div class="flex items-center flex-1 min-w-0">
                <img src="https://i.pinimg.com/originals/96/02/08/9602083f42463bb813399310d72233c5.png"
                    class="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                  <p class="text-lg font-bold text-gray-800 truncate">Software Engineeer</p>
                  <p class="text-gray-600 text-md">Pinterest</p>
                </div>
              </div>
              <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                  sm:mt-0">
                <a href="" class="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-gray-700 rounded-lg">Apply</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


{/* <div class="flex items-center justify-center">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
    
        <div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div class=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
               
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <div class="mt-8">
                <p class="text-xl font-semibold my-2">App Development</p>
                <div class="flex space-x-2 text-gray-400 text-sm">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                     <p>Marketing Team</p> 
                </div>
                <div class="flex space-x-2 text-gray-400 text-sm my-3">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                     <p>1 Weeks Left</p> 
                </div>
                <div class="border-t-2"></div>

                <div class="flex justify-between">
                    <div class="my-2">
                        <p class="font-semibold text-base mb-2">Team Member</p>
                        <div class="flex space-x-2">
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                            class="w-6 h-6 rounded-full"/>
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg" 
                            class="w-6 h-6 rounded-full"/>
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU" 
                            class="w-6 h-6 rounded-full"/>
                        </div>
                    </div>
                     <div class="my-2">
                        <p class="font-semibold text-base mb-2">Progress</p>
                        <div class="text-base text-gray-400 font-semibold">
                            <p>34%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}

        
  </>
      
      );
};

export default Alljobs;

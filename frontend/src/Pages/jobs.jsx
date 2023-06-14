import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

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
    
    <div class="relative flex min-h-screen flex-col gap-5 jus items-center justify-center overflow-hidden bg-gray-100 p-6 sm:py-12">

{jobs.map((job) => (


<div  key={job.id} class="bg-white  shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
  <div>
    <span class="text-blue-700 text-xl">{job.company.name}</span>
    <h3 class="font-bold mt-px">{job.title}</h3>
    <div class="flex items-center gap-3 mt-2">
      <span class="bg-gray-300 text-gray-900 rounded-full px-3 py-1 text-sm">{job.locationType.locationType}</span>
      <span class="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>{job.type.type}</span>
    </div>
  </div>
  <div>
    <Link to={`/jobDetails/${job.id}`} class="bg-gray-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Apply Now <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
</svg>
</Link>
  </div>
   </div>

))}
</div>

  </>
      
      );
};

export default Alljobs;

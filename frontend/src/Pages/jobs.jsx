import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";

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
      {jobs.map((job) => (
        <div class="h-screen max-w-2xl mx-auto mt-24 space-y-20">
          <div class="max-w-screen-md md:w-3/4 mx-auto">
            <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 bg-blue-800 rounded-xl">
              <p class="w-full text-2xl font-semibold text-white">
              {job.jobTile}
              </p>
              <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">
              {job.description}
              </p>
              <div class="rounded mr-auto">
                <div class="opacity-95 border rounded-lg border-white px-4">
                  <p class="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">
                    <Link
                        key={job.id}
                        to={`/jobDetails/${job.id}`}
                        className="block md:px-4 text-base 	underline underline-offset-8	 transition hover:text-primary dark:hover:text-primaryLight"
                        >
                        Apply
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h1>hello Seeker</h1>
    </>
  );
};

export default Alljobs;

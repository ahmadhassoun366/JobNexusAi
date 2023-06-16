import React, { useState, useEffect } from "react";
import Header from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function RecruiterDashboard() {
    let [jobs, setJobs] = useState([]);
    let [applicants, setApplicants] = useState([]);

    useEffect(() => {
        getJobs();
    }, [])

    const addJob = () => {
        fetch('http://127.0.0.1:8000/api/recruiter_register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
            body: JSON.stringify({

            }) // body data type must match "Content-Type" header
        })
    }

    const getJobs = () => {
        fetch('http://127.0.0.1:8000/users/api/job/')
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error(error));
           

    }
    console.log(jobs);

    const compare = (a, b) => {
        if (a?.similarity < b?.similarity) {
            return 1;
        }
        if (a?.similarity > b?.similarity) {
            return -1;
        }
        return 0;
    }

    const getApplicants = (job_id) => {
        fetch(`http://127.0.0.1:8000/users/api/applicants/${job_id}/`)
            .then(response => response.json())
            .then(data => {
                data.sort(compare)
                setApplicants(data);
            })
            .catch(error => console.error(error));
    }

    const deleteJob = (job_id) => {
        fetch(`http://127.0.0.1:8000/users/api/delete_job/${job_id}/`, {
            method: 'DELETE'
        })
            .then(window.location.reload())
            .catch(error => console.error(error));
    }

    return (
        <>
        <Header />
           


        <section class="bg-cover  bg-no-repeat bg-[url('https://www.jobvite.com/wp-content/uploads/2017/06/download_asset.jpg')] bg-blend-multiply bg-gray-400">
            <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">AI-Powered Recruitment Platform for Recruiters</h1>
                <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Discover top talent and streamline your hiring process with our cutting-edge AI recruitment platform. Harness the power of artificial intelligence to make data-driven decisions and find the perfect candidates for your organization.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Get started
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                        Learn more
                    </a>  
                </div>
            </div>
        </section>

<div class="flex items-center justify-center">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
    {jobs.map((job) => (
        <div key={job?.id} class="relative bg-white py-6 px-6 rounded-3xl w-80 my-4 shadow-xl">
            <div class=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <div class="mt-8">
                <p class="text-xl font-semibold my-2">{job?.title}</p>
                <div class="flex space-x-2  font-bold">
                  
                     <p>{job?.company.name}</p> 
                </div>
                <div class="flex text-gray-700 text-base my-3">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                     <p>{job?.country.name}</p> 

                     <div class="flex ml-24 gap-1 text-gray-500">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                        <p class="font-semibold text-base mb-2">{job.type.type}</p>
                       
                    </div>
                    
                </div>
                <div class="border-t-2"></div>

                <div class="flex justify-between">
                    <div class="my-2">
                        <p class="font-semibold text-base mb-2">Recruiter</p>
                        <div class="flex space-x-2">
                            <img src={`http://127.0.0.1:8000/${job.recruiter.profilePicture}`}
                            class="w-6 h-6 rounded-full"/>
                          
                        </div>
                    </div>
                     
                </div>

                <div>
                <div className="flex justify-center items-center gap-4 text-white">
                <button onClick={() => { getApplicants(job?.id) }}
                className="px-4 py-2 rounded-lg bg-gray-900"
                >Applicants</button>
               
               <button 
                               className="px-4 py-2 rounded-lg bg-gray-900 text-white"
               >Edit</button>
                       
               <button 
                               className="px-4 py-2 rounded-lg bg-gray-900 text-white"

               onClick={() => deleteJob(job?.id)}>Delete</button>

                </div>
                    
                </div>
            </div>
        </div>
          ))}
</div>
</div>

            {applicants.map((applicant) => (
                <div key={applicant?.id}>
                    <h3>{applicant?.job.title}</h3>
                    <div>
                        <p>Name: {applicant?.seeker.user.first_name + " " + applicant?.seeker.user.last_name}</p>
                        <a href={applicant?.cv} download={applicant?.seeker.user.first_name + "-" + applicant?.seeker.user.last_name + "_CV"}>
                            <button>Dowload CV</button>
                        </a>
                        <p>Match: {applicant?.similarity}</p>
                    </div>
                </div>
            ))
            }
            {/* <Footer /> */}
        </>
    );
}
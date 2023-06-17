import React, { useState, useEffect } from "react";
import Header from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from 'axios';

export default function RecruiterDashboard() {
    let [jobs, setJobs] = useState([]);
    let [applicants, setApplicants] = useState([]);

    useEffect(() => {
        getJobs();
    }, [])

    /*const addJob = () => {
        fetch('http://127.0.0.1:8000/users/api/recruiter_register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
            body: JSON.stringify({

            }) // body data type must match "Content-Type" header
        })
    }*/

    //let deadline = new Date("2000-03-25")

    const jobData = {
        "company": 2,
        "recruiter": 2,
        "type": 1,
        "country": 3,
        "locationType": 1,
        "title": "acc",
        "description": "aaa",
        //"deadline": new Date("2023-10-16").toJSON()
    }

    const addJob = () => {
        axios.post('http://127.0.0.1:8000/users/api/add_job/', jobData)
            .then(response => {
                console.log('Added successfully:', response.data);
                window.location.reload()
            })
            .catch(error => console.error(error));
    }

    const getJobs = () => {
        /*fetch('http://127.0.0.1:8000/users/api/job/')
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error(error));*/
        axios.get('http://127.0.0.1:8000/users/api/job/')
            .then(response => setJobs(response.data))
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
        /*fetch(`http://127.0.0.1:8000/users/api/applicants/${job_id}/`)
            .then(response => response.json())
            .then(data => {
                data.sort(compare)
                setApplicants(data);
            })
            .catch(error => console.error(error));*/
        axios.get(`http://127.0.0.1:8000/users/api/applicants/${job_id}/`)
            .then(response => {
                response.data.sort(compare)
                setApplicants(response.data);
            })
            .catch(error => console.error(error));
    }

    const newJobData = {
        "country": 4,
        "locationType": 2
    }

    const editJob = (job_id) => {
        axios.put(`http://127.0.0.1:8000/users/api/edit_job/${job_id}/`, newJobData)
            .then(response => {
                console.log('Updated successfully:', response.data);
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    const deleteJob = (job_id) => {
        fetch(`http://127.0.0.1:8000/users/api/delete_job/${job_id}/`, {
            method: 'DELETE'
        })
            .then(() => {
                window.location.reload()
                //getJobs()
                //getApplicants()
            })
            .catch(error => console.error(error));
        /*axios.get(`http://127.0.0.1:8000/users/api/delete_job/${job_id}/`)
            .then(() => {
                window.location.reload()
                //getJobs()
                //getApplicants()
            })
            .catch(error => console.error(error));*/
    }

    return (
        <>
            <Header />

            <div className="flex flex-row justify-center items-center gap-24 my-10 pt-24 pb-36">

                <div className="">
                    <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                        <div class="rounded-xl overflow-hidden h-[140px] md:h-[262px]">
                            <img src="https://d4y70tum9c2ak.cloudfront.net/contentImage/Job-Switching-Ticker-V02.gif" class="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl" alt="" />
                        </div>
                    </div>
                    <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
                    <div class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]">
                    </div>
                </div>

                <div className="w-2/4 flex flex-col justify-center items-center gap-14">
                    <h1 class="text-xl font-bold leading-none lg:text-3xl xl:text-4xl text-center">Efficiently Identify Top Talent with AI</h1>
                    <p className="w-11/12 text-center text-xl text-gray-950 font-semibold"   >Streamline your hiring process and make data-driven decisions.</p>
                    <p className="w-3/4 text-justify">Our advanced AI algorithms analyze candidate profiles, resumes, and interview responses to help you make data-driven hiring decisions. Streamline your recruitment workflow, identify top candidates, and reduce time-to-hire.</p>                <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold animate-pulse	" >Post Job Now</button>
                </div>

            </div>

            <h1 className="text-4xl font-bold text-center leading-none lg:text-5xl xl:text-5xl text-gray-900">
                Manage Your Posted Jobs</h1>

            <div class="flex items-center justify-center mt-10">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                    {jobs.map((job) => (
                        <div key={job?.id} class="relative bg-white py-6 px-6 rounded-3xl w-80 my-4 shadow-xl">
                            <img src={`http://127.0.0.1:8000/${job.company.logo}`} className="flex-shrink-0 object-cover rounded-full btn- w-12 h-12 mb-8" />

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
                                                class="w-6 h-6 rounded-full" />

                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <div className="flex justify-center items-center gap-4 text-white">
                                        <button onClick={() => { getApplicants(job?.id) }} className="px-4 py-2 rounded-lg bg-gray-900">Applicants</button>

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
                    {/* <h3>{applicant?.job.title}</h3> */}
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
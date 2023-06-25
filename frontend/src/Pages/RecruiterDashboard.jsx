import React, { useState, useEffect, useContext } from "react";
import Nav from "../Components/RecruiterNav";
import Footer from "../Components/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";
import { AuthContext } from '../Services/AuthContext';

export default function RecruiterDashboard() {
    let [jobs, setJobs] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const storedRecruiterID = localStorage.getItem('recruiterId');
    useEffect(() => {
        if (isAuthenticated) {
            axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/jobRecruiter/${storedRecruiterID}/`)
                .then(response => setJobs(response.data))
                .catch(error => console.error(error));
        }
    }, [storedRecruiterID, isAuthenticated])

    const deleteJob = async (job_id) => {
        await fetch(`${process.env.REACT_APP_JOB_API_URL}/users/api/delete_job/${job_id}/`, {
            method: 'DELETE'
        })
            .then(() => {
                window.location.reload()
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <Nav />

            <div className="flex flex-col md:flex-row justify-center items-center gap-24 my-10 pt-24 pb-36">
                <div className="">
                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                        <div className="rounded-xl overflow-hidden h-[140px] md:h-[262px]">
                            <img src="https://d4y70tum9c2ak.cloudfront.net/contentImage/Job-Switching-Ticker-V02.gif" className="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl" alt="" />
                        </div>
                    </div>
                    <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
                    <div className="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
                </div>
                <div className="w-full md:w-2/4 flex flex-col justify-center items-center gap-14">
                    <h1 className="text-xl font-bold leading-none lg:text-3xl xl:text-4xl text-center">Efficiently Identify Top Talent with AI</h1>
                    <p className="w-11/12 text-center text-xl text-gray-950 font-semibold">Streamline your hiring process and make data-driven decisions.</p>
                    <p className="w-3/4 text-justify">Our advanced AI algorithms analyze candidate profiles, resumes, and interview responses to help you make data-driven hiring decisions. Streamline your recruitment workflow, identify top candidates, and reduce time-to-hire.</p>
                    <Link to={'/newJob'}>
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold animate-pulse">Post Job Now</button>
                    </Link>
                </div>
            </div>

            <h1 className="text-4xl font-bold text-center leading-none lg:text-5xl xl:text-5xl text-gray-900">Manage Your Posted Jobs</h1>


            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                    {jobs.map((job) => (
                        <div key={job?.id} className="relative bg-white py-6 px-6 rounded-3xl w-80 my-4 shadow-xl">
                            {job?.company.logo ? (
                                <img src={`${process.env.REACT_APP_JOB_API_URL}/${job?.company.logo}`} className="flex-shrink-0 object-cover rounded-full btn- w-12 h-12 mb-8" alt="" />
                            ) : (
                                <img src="" className="flex-shrink-0 object-cover rounded-full btn- w-12 h-12 mb-8" alt="" />
                            )}
                            <div className="mt-8">
                                <p className="text-xl font-semibold my-2">{job?.title}</p>
                                <div className="flex space-x-2  font-bold">

                                    <p>{job?.company.name}</p>
                                </div>
                                <div className="flex text-gray-700 text-base my-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p>{job?.country.name}</p>

                                    <div className="flex ml-24 gap-1 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="font-semibold text-base mb-2">{job?.type.type}</p>

                                    </div>

                                </div>
                                <div className="border-t-2"></div>

                                <div className="flex justify-between">
                                    <div className="my-2">
                                        <div className="flex flex-row space-x-2 justify-center items-center">
                                            {job?.deadline ? (
                                                <p className="font-semibold text-base mb-2">Deadline: {job?.deadline}</p>
                                            ) : (
                                                <p className="font-semibold text-base mb-2">Deadline: N/A</p>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <div className="flex justify-center items-center gap-4 text-white">
                                        <Link to={`/applicants/${job.id}`}>
                                            <button className="px-4 py-2 rounded-lg bg-gray-900">
                                                Applicants
                                            </button>
                                        </Link>

                                        <Link to={`/editJob/${job.id}`}>
                                            <button
                                                className=" ml-10 text-blue-500 hover:underline">
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            className="  text-red-500 hover:underline"

                                            onClick={() => deleteJob(job?.id)}>Delete</button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
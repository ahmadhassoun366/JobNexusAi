import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
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
            {/* <Header /> */}
            <div className="relative flex min-h-screen flex-col gap-5 jus items-center justify-center overflow-hidden bg-gray-100 p-6 sm:py-12">
                <div>
                    <button onClick={addJob}>Add a Job</button>
                </div>
                {jobs.map((job) => (
                    <div key={job?.id} className="bg-white  shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
                        <div>
                            <span className="text-blue-700 text-xl">{job?.company.name}</span>
                            <h3 className="font-bold mt-px">{job?.title}</h3>
                            {/* <p>Country: {job?.country.name}</p> */}
                            <div className="flex items-center gap-3 mt-2">
                                <span className="bg-gray-300 text-gray-900 rounded-full px-3 py-1 text-sm">{job?.country.name}</span>
                                <span className="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>{job.type.type}</span>
                            </div>
                            <button onClick={() => { getApplicants(job?.id) }}>Get Applicants</button>
                            <br />
                            {/* <button onClick={() => editJob(job?.id)}>Edit</button>
                            <br /> */}
                            <button onClick={() => deleteJob(job?.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div >
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
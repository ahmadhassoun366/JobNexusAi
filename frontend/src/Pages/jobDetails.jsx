import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Footer from "../Components/Footer";
  

const JobDetails = () => {
  const storedSeekerId = localStorage.getItem('seekerId'); 
  console.log('seeker' ,storedSeekerId);

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [seeker] = useState(storedSeekerId);

// eslint-disable-next-line

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOB_API_URL}/users/api/job/${id}/`, {
        method: "GET",
      });
      if (response.ok) {
        const jobData = await response.json();

        //resolve the filtering from the backend 

        setJob(jobData[0]);
        console.log(jobData);

      } else {
        console.error("Failed to fetch job details");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleCoverLetterFileChange = (event) => {
    setCoverLetterFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('job', id);
    formData.append('seeker', seeker);
    formData.append('cv', selectedFile);

    formData.append('coverLetter', coverLetterFile);

    console.log('job id', id)
    console.log('seeker', seeker)

    // Make the POST request using Axios
    axios.post(`${process.env.REACT_APP_JOB_API_URL}/users/api/create_application/`, formData)
      .then((response) => {
        // Handle the response from the API
        alert('Success')
        console.log('Upload successful:', response.data);
      })
      .catch((error) => {
        if(error.response.status === 405)
        alert('Already Apllied for this JOB')
        if(error.response.status === 403)
        alert('Deadline passed')
        console.error('Error:', error);
      });
  };



  return (
    <>
          <Navbar/>



      <div className="containe p-5 ">
        <div className="md:flex no-wrap md:-mx-2 mt-8">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2 ">
            {/* <!-- Profile Card --> */}
            <div className="bg-white p-3 space-y-5 ">
              <div className="image overflow-hidden shadow-2xl rounded-full">
                <img className="h-auto w-full mx-auto "
                src={`${process.env.REACT_APP_JOB_API_URL}/${job?.company.logo}`}
                  alt="" />
              </div>
              <h2 className="text-gray-600 font-lg text-semibold text-2xl leading-6 font-semibold text-center my-2 ">{job?.title}</h2>
              <p className="text-xl text-gray-500 hover:text-gray-600 leading-6 text-center my-2"  >
              {job?.company.field}
              </p>
              <h1 className=" text-3xl text-gray-800 font-bold text-center"> <span className="text-2xl text-red-500">Deadline:</span> {job?.deadline}</h1>
              
            </div>
            {/* <!-- End of profile card --> */}
            
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-24 h-64 ">
            {/* <!-- Profile tab --> */}
          <h1 className="text-center text-4xl text-gray-900 font-semibold ">{job?.title} at {job?.company.name}</h1>
            <div className="flex flex-col gap-6 p-10 shadow-lg  rounded-lg bg-gray-100 my-8">


            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#059669"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                </span>
                <span className="tracking-wide text-xl font-bold">Company Details</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Company Name</div>
                    <div className="px-4 py-2">{job?.company.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Field</div>
                    <div className="px-4 py-2">{job?.company.field}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Size</div>
                    <div className="px-4 py-2">{job?.company.size}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Type</div>
                    <div className="px-4 py-2">{job?.company.type}</div>
                  </div>

                </div>
              </div>


              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0891b2"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/></svg>
                </span>
                <span className="tracking-wide text-xl font-bold">Job Details</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Job Title</div>
                    <div className="px-4 py-2">{job?.title}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Country</div>
                    <div className="px-4 py-2">{job?.country.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Location type</div>
                    <div className="px-4 py-2">{job?.locationType.locationType}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-bold">Type</div>
                    <div className="px-4 py-2">{job?.type.type}</div>
                  </div>

                </div>
              </div>

              <div className="">
                <div>
                  <div className="flex flex-col">


                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e11d48"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                      </span>
                      <span className="tracking-wide text-xl font-bold">Description</span>
                    </div>
                    <p className="justify-center text-justify my-12">{job?.description}</p>
                  </div>

                </div>
              </div>


              <form className="" onSubmit={handleSubmit}>
              <div className="flex flex-row justify-between items-center gap-5">
                  {/* <!-- This is an Upload file  --> */}
                  <div className=" w-2/4">

                    <label className=" flex mb-2 text-xl font-medium text-gray-900 dark:text-gray-300" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d97706"><path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>
                    Upload Your CV</label>
                   
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden"
                           onChange={handleFileChange} />
                      </label>
                  </div> 
                  </div>

                  <div className="w-2/4">

                    <label className=" flex mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6d28d9"><path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>
                    Upload Your Cover Letter</label>
                                        
                      <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Only PDF (MAX. 800x400px)</p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden"
                              onChange={handleCoverLetterFileChange} />
                          </label>
                      </div> 

                    </div>

                </div>   
                <div className="flex justify-center items-center">

                <button className="mt-3 bg-gray-900 text-white font-medium px-10 py-3 rounded-md flex gap-1 items-center">Submit</button>
            </div>

              </form>
            </div>
            {/* <!-- End of about Job section --> */}
        </div>
      </div>
      </div>
    </>
  );
};

export default JobDetails;

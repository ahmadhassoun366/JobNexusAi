import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import axios from 'axios';

const JobDetails = () => {

  const { id } = useParams();
  const [job, setJob] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [seeker, setSeeker] = useState('');


  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/api/job/${id}/`, {
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

  const hnadleSeekerChange = (event) => {
    setSeeker(event.target.value);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleJobIdChange = (event) => {
  //   setJobId(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('cv', selectedFile);
    formData.append('job', id);
    formData.append('seeker', seeker);

    console.log('job id', id)
    console.log('seeker', seeker)

    // Make the POST request using Axios
    axios.post('http://127.0.0.1:8000/users/api/create_applicants/', formData)
      .then((response) => {
        // Handle the response from the API
        console.log('Upload successful:', response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  };



  return (
    <>
          {/* <Navbar/> */}



      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div className="bg-white p-3 border-t-4 border-gray-900">
              <div className="image overflow-hidden">
                <img className="h-auto w-full mx-auto rounded-full"
                  src="https://www.digicatapult.org.uk/wp-content/uploads/2021/11/DC_square_People_juergen-600x600-c-default.jpg"
                  alt="" />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{job?.recruiter.user.first_name} {job?.recruiter.user.last_name}</h1>
              <h2 className="text-gray-600 font-lg text-semibold leading-6 font-semibold">{job?.recruiter.title}</h2>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              {job?.recruiter.about}
              </p>
              
            </div>
            {/* <!-- End of profile card --> */}
            <div className="my-4"></div>
            
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab --> */}
            {/* <!-- About Company Section --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                </span>
                <span className="tracking-wide">Company Details</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Company Name</div>
                    <div className="px-4 py-2">{job?.company.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Field</div>
                    <div className="px-4 py-2">{job?.company.field}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Size</div>
                    <div className="px-4 py-2">{job?.company.size}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Type</div>
                    <div className="px-4 py-2">{job?.company.type}</div>
                  </div>

                </div>
              </div>

            </div>
            {/* <!-- End of about company section --> */}


            {/* <!-- About Job Section --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/></svg>
                </span>
                <span className="tracking-wide">Job Details</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Job Title</div>
                    <div className="px-4 py-2">{job?.title}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Country</div>
                    <div className="px-4 py-2">{job?.country.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Location type</div>
                    <div className="px-4 py-2">{job?.locationType.locationType}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Type</div>
                    <div className="px-4 py-2">{job?.type.type}</div>
                  </div>

                </div>
              </div>

            </div>
            {/* <!-- End of about Job section --> */}




            <div className="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">

              <div className="">
                <div>
                  <div className="flex flex-start flex-col">


                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                      </span>
                      <span className="tracking-wide">Description</span>
                    </div>
                    <p>{job?.description}</p>
                  </div>

                </div>
              </div>


              {/* <!-- End of Experience and education grid --> */}
            </div>
            {/* <!-- End of profile tab --> */}


            <div className="my-4"></div>

            {/* Upload File */}
            <div className="pb-3">
              <form className="bg-white p-3 shadow-sm rounded-sm mb-3" onSubmit={handleSubmit}>

                {/* For testing use */}
                {/* <div>
                  <label htmlFor="jobId">Seeker ID:</label>
                  <input
                    type="text"
                    id="seeker"
                    value={seeker}
                    onChange={hnadleSeekerChange}
                  />
                </div> */}
                <div>
                  

                  {/* <!-- This is an Upload file  --> */}
                  <div class=" mx-auto">

                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload Your CV</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* <button type="submit">Upload</button> */}
                <button className="mt-3 bg-gray-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Apply Now <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                </button>

              </form>
            </div>


          </div>


        </div>
      </div>
      {/* </div> */}












    </>
  );
};

export default JobDetails;

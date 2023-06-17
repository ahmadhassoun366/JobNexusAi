import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';

const Profile = () => {

  const { id } = useParams();
  const [seeker, setSeeker] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };


  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };



  
  useEffect(() => {
    getSeeker();
  }, []);



  const getSeeker = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/api/seeker/${id}/`, {
        method: "GET",
      });
      if (response.ok) {
        const seekerData = await response.json();

        //resolve the filtering from the backend 
        
        console.log("Seeker data --------------")
        setSeeker(seekerData[0]);
        console.log(seekerData);

      } else {
        console.error("Failed to fetch seeker details");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };



  return (
    <>
      <Navbar/>
        <div class="w-full ">
        <img src="https://marketplace.canva.com/EAE7gQjr2dU/1/0/1600w/canva-blue-modern-motivational-linkedin-banner-TJd4gmEFWyQ.jpg" class="w-full h-96 " />
            </div>
            <div class="flex flex-col items-center -mt-20 ">
                <img src={`http://127.0.0.1:8000/${seeker?.profilePicture}`} class="w-60 h-60 border-4 border-white rounded-full" />
                <div class="flex items-center space-x-2 mt-2 ">
                    <p class="text-2xl">{seeker?.user.first_name}  {seeker?.user.last_name}</p>
                    <span class="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <p class="text-gray-700">{seeker?.title}</p>
                <p class="text-sm text-gray-500">{seeker?.country.name}</p>
            </div>

      <div className="min-h-screen p-6  flex items-center justify-center ">
        <div className="container max-w-screen-lg mx-auto bg-white rounded shadow-2xl">

         

         

        <div>
            {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}
            <div className=" p-4 px-4 md:p-8 mb-6">
            <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 1: Personal Details</h2>

              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className='flex gap-2 md:col-span-5'>
                    <div className="flex-1 ">
                      <label htmlFor="full_name">First Name</label>
                      <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="full_name">Last Name</label>
                      <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>
                    </div>
                   
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Phone Number</label>
                      <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                    </div>

                 

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                          <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                        <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                          <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </button>
                      </div>
                    </div>

                      <div className="md:col-span-5">
                        <label>About</label>
                        <textarea
                          type="text"
                          className="h-56 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      
                    <div className="md:col-span-5">
                      <label htmlFor="profile_pic">Profile Picture</label>
                      <input type="file" name="profile_pic" id="profile_pic" className="border mt-1 rounded px-4 py-2 w-full bg-gray-50" onChange={handleProfilePicUpload} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




        <div>
           
           {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

           <div className="p-4 px-4 md:p-8 mb-6">
           <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 2: Educational Details</h2>
             <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
               <div className="text-gray-600">
                 <p className="font-medium text-lg">Educational Details</p>
                 <p>Please fill out all the fields.</p>
               </div>

               <div className="lg:col-span-2">
                 <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                   <div className="md:col-span-5">
                     <label htmlFor="university">Major</label>
                     <input
                       type="text"
                       name="university"
                       id="university"
                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                       value=""
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>



         <div>
            {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

            <div className="p-4 px-4 md:p-8 mb-6">
            <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 3: Job Experience Details</h2>

              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Job Experience Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                        <label>Title</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        
                          
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Experience</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        
                          
                        />
                      </div>
                    </div>
              

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Skills</label>
                        <textarea
                          type="text"
                          className="h-32 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                    </div>


                     <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Languages</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      </div>

                </div>


                

        
              </div>
            </div>
          </div>


          <div>
            {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

            <div className=" p-4 px-4 md:p-8 mb-6">
            <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 4: Upload Your Resume</h2>

              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Upload Your Resume</p>
                  <p>Please upload your resume file.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex flex-col">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="border mt-1 rounded px-4 py-2 w-full bg-gray-50"
                    />
                    <small className="text-gray-500 mt-1">Accepted file types: .pdf, .doc, .docx</small>
                  </div>
                </div>

                <div className="md:col-span-5 text-right mt-5">
                  <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          </div>
      </div>

   </>  )
}

export default Profile
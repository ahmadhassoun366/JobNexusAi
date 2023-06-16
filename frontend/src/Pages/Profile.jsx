import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SmallFooter from '../Components/SmallFooter';
import Navbar from '../Components/Navbar';
import PersonalDetials from '../Profile/PersonalDetials';
import EducationalDetails from '../Profile/EducationalDetails';
import JobExperienceDetails from '../Profile/JobExperienceDetails ';
import UploadResume from '../Profile/UploadResume';

const Profile = () => {

  const { id } = useParams();
  const [seeker, setSeeker] = useState(null);

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
        <div class="w-full h-[250px]">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
            </div>
            <div class="flex flex-col items-center -mt-20">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" class="w-40 border-4 border-white rounded-full" />
                <div class="flex items-center space-x-2 mt-2">
                    <p class="text-2xl">Amanda Ross</p>
                    <span class="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <p class="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                <p class="text-sm text-gray-500">New York, USA</p>
            </div>

      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto bg-white rounded shadow-lg">

          <PersonalDetials/>
          <EducationalDetails/>
          <JobExperienceDetails/>
          <UploadResume/>
      </div>
      </div>

   </>  )
}

export default Profile
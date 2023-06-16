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
      <div>
        <Navbar/>
        <PersonalDetials/>
        <EducationalDetails/>
        <JobExperienceDetails/>
        <UploadResume/>
        <SmallFooter/>
      </div>
   </>  )
}

export default Profile
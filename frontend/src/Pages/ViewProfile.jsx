import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import axios from 'axios';
import bgProfile from "../assets/img/seekerProfile.jpg";


const Profile = () => {

  const { id } = useParams();
  const [seeker, setSeeker] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);


  const [idSeeker, setIDSeeker] = useState(null);
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [about, setAbout] = useState(null);
  const [education, setEducation] = useState(null);
  const [title, setTitle] = useState(null);
  const [experience, setExperience] = useState(null);
  const [skills, setSkills] = useState(null);
  const [language, setLanguage] = useState(null);

  const handleFirstName = (e) => {
    setFirst_name(e.target.value);
  }

  const handleLast_name = (e) => {
    setLast_name(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  const handleCountry = (e) => {
    setCountry(e.target.value);
  }

  const handleAbout = (e) => {
    setAbout(e.target.value);
  }

  const handleEducation = (e) => {
    setEducation(e.target.value);
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleExperience = (e) => {
    setExperience(e.target.value);
  }

  const handleSkills = (e) => {
    setSkills(e.target.value);
  }

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
    console.log("file uploaded-----------------");
  };


  const handleProfilePicUpload = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    setProfilePic(file);

    const formData = new FormData();
    formData.append('profilePicture', file);

    if (idSeeker) {
      axios.put(`${process.env.REACT_APP_JOB_API_URL}/users/api/seeker_update/${idSeeker}/`, formData)
        .then((response) => {
          // Handle the response from the API
          console.log('Upload successful:', response.data);
          alert("Profile Picture Updated successfully")
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });

      console.log("Profile uploaded-----------------");
    };
  }


  const handleUpdate = (e) => {
    e.preventDefault();


    const data = {
      "id": 5,
      "user": {
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone
      },
      "title": title,
      "about": about,
      "education": education,
      "skill": skills,
      "experience": experience,
      "language": language
    };

    if (idSeeker) {
      // Make the POST request using Axios
      axios.put(`${process.env.REACT_APP_JOB_API_URL}/users/api/seeker_update/${idSeeker}/`, data)
        .then((response) => {
          // Handle the response from the API
          console.log('Upload successful:', response.data);
          alert("Profile Update successfully")
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
    }



  }


  useEffect(() => {
    console.log("useEffect");
    if(id){
      getSeeker();
    }
  }, [id]);



  const getSeeker = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOB_API_URL}/users/api/seeker/${id}/`, {
        method: "GET",
      });
      if (response.ok) {
        const seekerData = await response.json();

        //resolve the filtering from the backend 

        console.log("Seeker data --------------")
        setSeeker(seekerData[0]);
        console.log(seekerData);

        setFirst_name(seekerData[0]?.user.first_name);
        console.log('firstname------------------');
        console.log(seekerData[0]?.user.first_name);
        setIDSeeker(seekerData[0]?.id);
        setLast_name(seekerData[0]?.user.last_name);
        setPhone(seekerData[0]?.user.phone);
        setCountry(seekerData[0]?.country.name);
        setAbout(seekerData[0]?.about);
        setEducation(seekerData[0]?.education);
        setTitle(seekerData[0]?.title);
        setExperience(seekerData[0]?.experience);
        setSkills(seekerData[0]?.skill);
        setLanguage(seekerData[0]?.language);

      } else {
        console.error("Failed to fetch seeker details");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };




  return (
    <>
      <Navbar />
      <form onSubmit={handleUpdate}>
      <   div className="w-full mt-24 sm:mt-0 ">
                <img src={bgProfile} className="w-full h-96 hidden sm:block " alt="" />
            </div>
        <div class="flex flex-col items-center -mt-20 ">
          <img src={`${process.env.REACT_APP_JOB_API_URL}/${seeker?.profilePicture}`}
            style={{ objectPosition: 'center top' }}
            class="w-80 h-80 border-4 object-cover					border-gray-700 rounded-full shadow-2xl" />
          <div class="flex items-center space-x-2 mt-2 ">
            <p class="text-2xl">{first_name}  {last_name}</p>
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
                <h2 className="font-semibold text-3xl text-gray-600 my-5">Personal Details</h2>

                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    {/* <p className="font-medium text-lg">Personal Details</p> */}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className='flex gap-2 md:col-span-5'>
                        <div className="flex-1 ">
                          <label >First Name</label>
                          <input onChange={handleFirstName} readOnly type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={first_name} />
                        </div>
                        <div className="flex-1">
                          <label >Last Name</label>
                          <input onChange={handleLast_name} readOnly type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={last_name} />
                        </div>
                      </div>

                      {/* <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                    </div> */}

                      <div className="md:col-span-3">
                        <label >Phone Number</label>
                        <input onChange={handlePhone} readOnly type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={phone} placeholder="" />
                      </div>



                      <div className="md:col-span-2">
                        <label>Country / region</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input onChange={handleCountry} readOnly name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={country} />
                          <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                          <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        <label>About</label>
                        <textarea readOnly
                          type="text"
                          className="h-56 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={about}
                          onChange={handleAbout}
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
                <h2 className="font-semibold text-3xl text-gray-600 my-5">Educational Details</h2>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    {/* <p className="font-medium text-lg">Educational Details</p> */}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label >Major</label>
                        <input
                            readOnly
                          type="text"
                          name="university"
                          id="university"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={education}
                          onChange={handleEducation}
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
                <h2 className="font-semibold text-3xl text-gray-600 my-5">Job Experience Details</h2>

                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    {/* <p className="font-medium text-lg">Job Experience Details</p> */}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Title</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={title}
                          onChange={handleTitle}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Experience</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={experience}
                          onChange={handleExperience}
                          readOnly
                        />
                      </div>
                    </div>


                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Skills</label>
                        <textarea
                          type="text"
                          className="h-32 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={skills}
                          onChange={handleSkills}
                          readOnly
                        />
                      </div>
                    </div>


                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Languages</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={language}
                          onChange={handleLanguage}
                          readOnly
                        />
                      </div>
                    </div>

                  </div>





                </div>
              </div>
            </div>


            


          </div>
        </div>
      </form>

    </>)
}

export default Profile
import React, { useState, useEffect,useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { FiDownload } from 'react-icons/fi';
import { AuthContext } from '../Services/AuthContext';
import Modal from '../Shared/Modal';


const GetApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const {  isAuthenticated } = useContext(AuthContext);
  const [seekerId, setSeekerId] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      getApplicants();
    }
  }, [isAuthenticated]);

  const getApplicants = async () => {
    await axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/applicants/${id}/`)
      .then(response => {
        const sortedApplicants = response.data.sort(compare);
        setApplicants(sortedApplicants);
      })
      .catch(error => console.error(error));
  }

  const handleSendNotification = async (e) => {
    e.preventDefault();

    setSeekerId(e);
    
    let job = id;
    console.log("job: ", id);
    let seeker = seekerId;
    console.log("seeker: ", seeker);
    const data = {
      job,
      seeker,
    };

    await fetch(`${process.env.REACT_APP_JOB_API_URL}/users/api/accepte_Notification/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
      .then((response) => {
        console.log('send successful');
        setIsModalOpen(true);

      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSeeker = (id, f_Name, l_Name) => {
    setSeekerId(id);
    setFirstName(f_Name);
    setLastName(l_Name);
  };

  const compare = (a, b) => {
    if (a?.similarity < b?.similarity) {
      return 1;
    }
    if (a?.similarity > b?.similarity) {
      return -1;
    }
    return 0;
  }

  // edited here
  const download = (url) => {
    let path = url.split('/').pop();
    let aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', path);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }
  // ended here

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center my-20">
        <div className="max-w-3xl w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Talented Candidates</h2>
          <p className="text-gray-600 mb-8">We have carefully selected the following candidates based on their qualifications and experience:</p>

          <ul className="space-y-6">
            {applicants.map(applicant => (
              <li key={applicant?.id}>
                <div className="flex items-center">
                  <img className="w-12 h-12 rounded-full" src={`${process.env.REACT_APP_JOB_API_URL}/${applicant?.seeker.profilePicture}`} alt="Profile" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{applicant?.seeker.user.first_name} {applicant?.seeker.user.last_name}</h3>
                    <p className="text-sm text-gray-600">{applicant?.seeker.user.email}</p>
                    <p className="text-sm text-gray-600">{applicant?.seeker.user.phone}</p>
                  </div>
                  <div className="ml-auto text-base  text-gray-900 font-bold">
                    <span className="text-gray-500 font-semibold">CV AI Score:</span> {applicant?.cv_similarity}%
                  </div>
                  <div className="ml-auto text-base  text-gray-900 font-bold">
                    <span className="text-gray-500 font-semibold">Cover Letter AI Score:</span> {applicant?.letter_similarity}%
                  </div>
                  <form onSubmit={handleSendNotification} className="ml-auto text-base  text-gray-900 font-bold">
                    {/* <input type="hidden" onChange={handleSeeker} value={applicant?.seeker.id}/> */}
                    <button type="submit" onClick={() => handleSeeker(applicant?.seeker.id, applicant?.seeker.user.first_name, applicant?.seeker.user.last_name)} className="inline-block mx-auto shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-5 rounded">send</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 py-10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">All Applicants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isAuthenticated && applicants.map(applicant => (
              <div key={applicant?.id} className="bg-white p-6 rounded-lg shadow-md">
                <img className="w-12 h-12 rounded-full mx-auto mb-4" src={`${process.env.REACT_APP_JOB_API_URL}/${applicant?.seeker.profilePicture}`} alt="Profile" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">{applicant?.seeker.user.first_name} {applicant?.seeker.user.last_name}</h3>
                <p className="text-sm text-gray-600 text-center">{applicant?.seeker.user.email}</p>
                <p className="text-sm text-gray-600 text-center">{applicant?.seeker.user.phone}</p>
                {/* edited here */}
                <div className="flex justify-center mt-4 space-x-4">
                  <button onClick={() => {
                    download(applicant.cv);
                  }} className="px-7 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">CV</button>
                                <FiDownload size={25} color="black"/>

                </div>
                <div className="flex justify-center items-center mt-4 space-x-4">
                  <button onClick={() => {
                    download(applicant.coverLetter);
                  }} className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">CoverLetter</button>
                                    <FiDownload size={25} color="black"/>

                </div>
                {/* ended here */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title="Send successfully."
          message={`Successfully send an email to ${firstName} ${lastName} to prepare for the next step`}
        />
      )}
    </>
  );
}

export default GetApplicants;
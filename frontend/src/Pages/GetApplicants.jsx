import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';

const GetApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    getApplicants();
  }, []);

  const getApplicants = () => {
    axios.get(`http://127.0.0.1:8000/users/api/applicants/${id}/`)
      .then(response => {
        const sortedApplicants = response.data.sort(compare);
        setApplicants(sortedApplicants);
      })
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

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center my-20">
        <div className="max-w-3xl w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Talented Candidates</h2>
          <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          <ul className="space-y-6">
            {applicants.map(applicant => (
              <li key={applicant?.id}>
                <div className="flex items-center">
                  <img className="w-12 h-12 rounded-full" src={`http://127.0.0.1:8000/${applicant?.seeker.profilePicture}`} alt="Profile" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{applicant?.seeker.user.first_name} {applicant?.seeker.user.last_name}</h3>
                    <p className="text-sm text-gray-600">{applicant?.seeker.user.email}</p>
                    <p className="text-sm text-gray-600">{applicant?.seeker.user.phone}</p>
                  </div>
                  <div className="ml-auto text-base  text-gray-900 font-bold">
                  <span className="text-gray-500 font-semibold">AI Score:</span> {applicant?.similarity}%
                  </div>
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
            {applicants.map(applicant => (
              <div key={applicant?.id} className="bg-white p-6 rounded-lg shadow-md">
                <img className="w-12 h-12 rounded-full mx-auto mb-4" src={`http://127.0.0.1:8000/${applicant?.seeker.profilePicture}`} alt="Profile" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">{applicant?.seeker.user.first_name} {applicant?.seeker.user.last_name}</h3>
                <p className="text-sm text-gray-600 text-center">{applicant?.seeker.user.email}</p>
                <p className="text-sm text-gray-600 text-center">{applicant?.seeker.user.phone}</p>
                <div className="flex justify-center mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Download CV</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GetApplicants;

import React, { useState } from 'react';

const JobExperienceDetails = () => {
  const [jobExperiences, setJobExperiences] = useState([{ company: '', position: '', start_date: '', end_date: '' }]);


  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...jobExperiences];
    updatedExperiences[index][field] = value;
    setJobExperiences(updatedExperiences);
  };

  return (
    <>
   
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
                  {jobExperiences.map((experience, index) => (
                    <div key={index} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor={`company_${index}`}>Company</label>
                        <input
                          type="text"
                          name={`company_${index}`}
                          id={`company_${index}`}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor={`position_${index}`}>Position</label>
                        <input
                          type="text"
                          name={`position_${index}`}
                          id={`position_${index}`}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={experience.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor={`start_date_${index}`}>Start Date</label>
                        <input
                          type="text"
                          name={`start_date_${index}`}
                          id={`start_date_${index}`}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={experience.start_date}
                          onChange={(e) => handleExperienceChange(index, 'start_date', e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor={`end_date_${index}`}>End Date</label>
                        <input
                          type="text"
                          name={`end_date_${index}`}
                          id={`end_date_${index}`}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={experience.end_date}
                          onChange={(e) => handleExperienceChange(index, 'end_date', e.target.value)}
                        />
                      </div>

                      {index !== jobExperiences.length - 1 && <hr className="my-4 border-gray-300" />}
                    </div>
                  ))}
                </div>

        
              </div>
            </div>
          </div>

          
     
    </>
  );
};

export default JobExperienceDetails;

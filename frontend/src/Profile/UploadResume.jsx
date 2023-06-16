import React, { useState } from 'react';

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  return (
    <>
    
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
        
    </>
  );
};

export default UploadResume;

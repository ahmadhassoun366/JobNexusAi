import React, { useState } from 'react';

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 4: Upload Your Resume</h2>
            {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
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

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadResume;

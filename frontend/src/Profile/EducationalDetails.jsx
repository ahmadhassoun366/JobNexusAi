import React from 'react';

const EducationalDetails = () => {
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-3xl text-gray-600 my-5">Step 2: Educational Details</h2>
            {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Educational Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="university">University/College</label>
                      <input
                        type="text"
                        name="university"
                        id="university"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="degree">Degree</label>
                      <input
                        type="text"
                        name="degree"
                        id="degree"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="field">Field of Study</label>
                      <input
                        type="text"
                        name="field"
                        id="field"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="graduation_year">Graduation Year</label>
                      <input
                        type="text"
                        name="graduation_year"
                        id="graduation_year"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Next
                        </button>
                      </div>
                    </div>
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

export default EducationalDetails;

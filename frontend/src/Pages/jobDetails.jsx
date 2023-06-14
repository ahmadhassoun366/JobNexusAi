import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/api/job/${id}/`, {
        method: "GET",
      });
      if (response.ok) {
        const jobData = await response.json();
      
        //resolve the filtering from the backend 

        setJob(jobData[0]);
        console.log(jobData);

      } else {
        console.error("Failed to fetch job details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className="">
      <div className="h">
        <h1>
          {job?.title}
        </h1>

        <h1>{job?.company.name}</h1>
        <h1>{job?.company.field}</h1>
        <h1>{job?.country.name}</h1>
        <h1>{job?.type.type}</h1>
      </div>
    </div>
    </>
  );
};

export default JobDetails;

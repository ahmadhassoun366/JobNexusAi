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
        setJob(jobData);
        console.log(jobData);

      } else {
        console.error("Failed to fetch job details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <>
 <div className=""></div>
    </>
  );
};

export default JobDetails;

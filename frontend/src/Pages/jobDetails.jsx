import { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import {useParams} from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams();
  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  let getAllJobs = async () => {
    let response = await fetch("http://127.0.0.1:8000/users/api/job/", {
      method: "GET",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setJobs(data);
    } else if (response.statusText === "Unauthorized") {
      console.log("can't get jobs");
    }
  };

  return (
    <>
    {/* <Navbar/> */}
      
      <h1>job details</h1>
      <h1>{id}</h1>
    </>
  );
};

export default JobDetails;
